const db = require('./config/db');

console.log('🔄 Starting role-based access migration...\n');

// Rollback-safe migration script
async function migrateRoles() {
    try {
        console.log('📊 Backing up current data...');

        // Create backup tables
        db.exec(`
            CREATE TABLE IF NOT EXISTS mst_users_backup AS SELECT * FROM mst_users;
            CREATE TABLE IF NOT EXISTS user_companies_backup AS SELECT * FROM user_companies;
        `);

        console.log('✅ Backup created.');

        // Update mst_users role_level values
        console.log('🔄 Updating global roles in mst_users...');

        const updateGlobalRoles = db.prepare(`
            UPDATE mst_users
            SET role_level = CASE
                WHEN role_level = 'superadmin' THEN 'SUPER_ADMIN'
                WHEN role_level = 'admin' THEN 'ADMIN'
                WHEN role_level = 'user' THEN 'STAFF'
                ELSE role_level
            END
        `);

        const globalUpdates = updateGlobalRoles.run();
        console.log(`✅ Updated ${globalUpdates.changes} global role assignments.`);

        // Update user_companies role_in_company values
        console.log('🔄 Updating company-specific roles in user_companies...');

        const updateCompanyRoles = db.prepare(`
            UPDATE user_companies
            SET role_in_company = CASE
                WHEN role_in_company = 'owner' THEN 'OWNER'
                WHEN role_in_company = 'admin' THEN 'ADMIN'
                WHEN role_in_company IN ('manager', 'accountant', 'viewer') THEN 'STAFF'
                ELSE role_in_company
            END
        `);

        const companyUpdates = updateCompanyRoles.run();
        console.log(`✅ Updated ${companyUpdates.changes} company-specific role assignments.`);

        // Add additional indexes for better performance
        console.log('⚡ Adding performance indexes...');

        db.exec(`
            CREATE INDEX IF NOT EXISTS idx_mst_users_role_level ON mst_users(role_level);
            CREATE INDEX IF NOT EXISTS idx_user_companies_role ON user_companies(role_in_company);
            CREATE INDEX IF NOT EXISTS idx_user_companies_active ON user_companies(is_active);
            CREATE INDEX IF NOT EXISTS idx_otp_verifications_used ON otp_verifications(is_used);
        `);

        console.log('✅ Indexes created.');

        // Verify role constraints (ensure only valid roles exist)
        console.log('🔍 Verifying role constraints...');

        const invalidGlobalRoles = db.prepare(`
            SELECT COUNT(*) as count FROM mst_users
            WHERE role_level NOT IN ('SUPER_ADMIN', 'ADMIN', 'STAFF')
        `).get();

        const invalidCompanyRoles = db.prepare(`
            SELECT COUNT(*) as count FROM user_companies
            WHERE role_in_company NOT IN ('OWNER', 'ADMIN', 'STAFF')
        `).get();

        if (invalidGlobalRoles.count > 0 || invalidCompanyRoles.count > 0) {
            throw new Error(`Invalid roles found: ${invalidGlobalRoles.count} global, ${invalidCompanyRoles.count} company-specific`);
        }

        console.log('✅ Role constraints verified.');

        console.log('✅ Migration completed successfully!');
        console.log('\n📋 Summary:');
        console.log('- Updated global roles: superadmin → SUPER_ADMIN, admin → ADMIN, user → STAFF');
        console.log('- Updated company roles: owner → OWNER, admin → ADMIN, manager/accountant/viewer → STAFF');
        console.log('- Added performance indexes');
        console.log('- Verified role constraints');

    } catch (error) {
        console.error('❌ Migration failed:', error);

        // Rollback option
        console.log('🔄 Attempting rollback...');
        try {
            db.exec(`
                DELETE FROM mst_users;
                INSERT INTO mst_users SELECT * FROM mst_users_backup;
                DELETE FROM user_companies;
                INSERT INTO user_companies SELECT * FROM user_companies_backup;
                DROP TABLE mst_users_backup;
                DROP TABLE user_companies_backup;
            `);
            console.log('✅ Rollback completed.');
        } catch (rollbackError) {
            console.error('❌ Rollback failed:', rollbackError);
        }

        throw error;
    }
}

// Sample data insertion function
function insertSampleData() {
    console.log('📝 Inserting sample data...');

    try {
        // Insert sample SUPER_ADMIN user
        const insertSuperAdmin = db.prepare(`
            INSERT OR IGNORE INTO mst_users (
                username, email, password, full_name, phone, role_level, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        // Note: In real implementation, hash the password
        insertSuperAdmin.run(
            'superadmin',
            'superadmin@example.com',
            '$2b$10$hashedpassword', // Placeholder - use proper hashing
            'Super Administrator',
            '+1234567890',
            'SUPER_ADMIN',
            1
        );

        // Insert sample company
        const insertCompany = db.prepare(`
            INSERT OR IGNORE INTO companymaster (
                company_name, company_address, status
            ) VALUES (?, ?, ?)
        `);

        const companyResult = insertCompany.run(
            'Sample Company Ltd',
            '123 Business St, City, State',
            1
        );

        const companyId = companyResult.lastInsertRowid;

        // Insert sample OWNER for the company
        const insertOwner = db.prepare(`
            INSERT OR IGNORE INTO mst_users (
                username, email, password, full_name, phone, role_level, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const ownerResult = insertOwner.run(
            'owner1',
            'owner@example.com',
            '$2b$10$hashedpassword', // Placeholder
            'Company Owner',
            '+1234567891',
            'ADMIN', // Global role
            1
        );

        const ownerId = ownerResult.lastInsertRowid;

        // Assign OWNER role in company
        const assignOwnerRole = db.prepare(`
            INSERT OR IGNORE INTO user_companies (
                userid, companyid, role_in_company, assigned_by
            ) VALUES (?, ?, ?, ?)
        `);

        assignOwnerRole.run(ownerId, companyId, 'OWNER', 1);

        // Insert sample STAFF user
        const insertStaff = db.prepare(`
            INSERT OR IGNORE INTO mst_users (
                username, email, password, full_name, phone, role_level, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const staffResult = insertStaff.run(
            'staff1',
            'staff@example.com',
            '$2b$10$hashedpassword', // Placeholder
            'Staff Member',
            '+1234567892',
            'STAFF', // Global role
            1
        );

        const staffId = staffResult.lastInsertRowid;

        // Assign STAFF role in company
        const assignStaffRole = db.prepare(`
            INSERT OR IGNORE INTO user_companies (
                userid, companyid, role_in_company, assigned_by
            ) VALUES (?, ?, ?, ?, ?)
        `);

        assignStaffRole.run(staffId, companyId, 'STAFF', ownerId);

        console.log('✅ Sample data inserted successfully.');

    } catch (error) {
        console.error('❌ Sample data insertion failed:', error);
    }
}

// Run migration
if (require.main === module) {
    migrateRoles()
        .then(() => {
            console.log('\n🎉 Role migration completed successfully!');
            // Uncomment to insert sample data
            // insertSampleData();
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Role migration failed:', error);
            process.exit(1);
        });
}

module.exports = { migrateRoles, insertSampleData };
