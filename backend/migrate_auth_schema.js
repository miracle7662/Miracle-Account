const db = require('./config/db');

console.log('🔄 Starting authentication schema migration...\n');

// Migration script to handle existing data
async function migrateAuthSchema() {
    try {
        // Check if migration has already been run
        const migrationCheck = db.prepare(`
            SELECT name FROM sqlite_master
            WHERE type='table' AND name='user_companies'
        `).get();

        if (!migrationCheck) {
            console.log('❌ New tables not found. Please run the updated db.js first.');
            return;
        }

        console.log('📊 Checking existing user data...');

        // Get existing users with company/year data
        const existingUsers = db.prepare(`
            SELECT userid, username, email, companyid, yearid, role_level, created_by_id
            FROM mst_users
            WHERE companyid IS NOT NULL AND yearid IS NOT NULL
        `).all();

        console.log(`Found ${existingUsers.length} users with company relationships to migrate.`);

        if (existingUsers.length > 0) {
            console.log('🔄 Migrating user-company relationships...');

            // Insert into user_companies table
            const insertUserCompany = db.prepare(`
                INSERT OR IGNORE INTO user_companies (
                    userid, companyid, role_in_company, assigned_by
                ) VALUES (?, ?, ?, ?)
            `);

            let migratedCount = 0;
            for (const user of existingUsers) {
                // Determine role_in_company based on role_level
                let roleInCompany = 'viewer'; // default
                if (user.role_level === 'superadmin') {
                    roleInCompany = 'owner';
                } else if (user.role_level === 'admin') {
                    roleInCompany = 'admin';
                } else if (user.role_level === 'user') {
                    roleInCompany = 'accountant';
                }

                try {
                    insertUserCompany.run(
                        user.userid,
                        user.companyid,
                        roleInCompany,
                        user.created_by_id || user.userid // assigned by creator or self
                    );
                    migratedCount++;
                } catch (insertError) {
                    console.log(`⚠️  Skipping user ${user.username} - relationship may already exist`);
                }
            }

            console.log(`✅ Migrated ${migratedCount} user-company relationships.`);
        }

        // Update mst_users table to remove companyid/yearid columns (if they exist)
        console.log('🧹 Cleaning up old columns from mst_users...');

        // Check if columns exist before trying to drop them
        const tableInfo = db.prepare("PRAGMA table_info(mst_users)").all();
        const hasCompanyId = tableInfo.some(col => col.name === 'companyid');
        const hasYearId = tableInfo.some(col => col.name === 'yearid');

        if (hasCompanyId || hasYearId) {
            // Temporarily disable foreign key constraints
            db.pragma('foreign_keys = OFF');

            // Drop dependent tables temporarily
            db.exec('DROP TABLE IF EXISTS user_companies_temp');
            db.exec('CREATE TABLE user_companies_temp AS SELECT * FROM user_companies');

            // Drop the user_companies table to avoid FK constraints
            db.exec('DROP TABLE IF EXISTS user_companies');

            // Create new table without the columns
            db.exec(`
                DROP TABLE IF EXISTS mst_users_new;
                CREATE TABLE mst_users_new (
                    userid INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    full_name TEXT NOT NULL,
                    phone TEXT,
                    email_verified INTEGER DEFAULT 0,
                    phone_verified INTEGER DEFAULT 0,
                    role_level TEXT NOT NULL,
                    parent_user_id INTEGER,
                    status INTEGER DEFAULT 1,
                    last_login DATETIME,
                    created_by_id INTEGER,
                    created_date DATETIME,
                    updated_by_id INTEGER,
                    updated_date DATETIME
                );

                INSERT INTO mst_users_new (
                    userid, username, email, password, full_name, phone,
                    email_verified, phone_verified, role_level, parent_user_id,
                    status, last_login, created_by_id, created_date,
                    updated_by_id, updated_date
                )
                SELECT
                    userid, username, email, password, full_name, phone,
                    0 as email_verified, 0 as phone_verified, role_level, parent_user_id,
                    status, last_login, created_by_id, created_date,
                    updated_by_id, updated_date
                FROM mst_users;

                DROP TABLE mst_users;
                ALTER TABLE mst_users_new RENAME TO mst_users;
            `);

            // Recreate user_companies table
            db.exec(`
                CREATE TABLE user_companies (
                    user_company_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    userid INTEGER NOT NULL,
                    companyid INTEGER NOT NULL,
                    role_in_company TEXT NOT NULL,
                    assigned_by INTEGER,
                    assigned_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                    is_active INTEGER DEFAULT 1,
                    FOREIGN KEY (userid) REFERENCES mst_users(userid) ON DELETE CASCADE,
                    FOREIGN KEY (companyid) REFERENCES companymaster(companyid) ON DELETE CASCADE,
                    FOREIGN KEY (assigned_by) REFERENCES mst_users(userid),
                    UNIQUE(userid, companyid)
                );
            `);

            // Restore data from temp table
            try {
                db.exec('INSERT INTO user_companies SELECT * FROM user_companies_temp');
            } catch (restoreError) {
                console.log('⚠️  Could not restore all user_companies data, some relationships may need manual review');
            }

            // Clean up temp table
            db.exec('DROP TABLE IF EXISTS user_companies_temp');

            // Re-enable foreign key constraints
            db.pragma('foreign_keys = ON');

            console.log('✅ Cleaned up mst_users table (removed companyid/yearid columns).');
        }

        // Create indexes for better performance
        console.log('⚡ Creating performance indexes...');

        db.exec(`
            CREATE INDEX IF NOT EXISTS idx_user_companies_userid ON user_companies(userid);
            CREATE INDEX IF NOT EXISTS idx_user_companies_companyid ON user_companies(companyid);
            CREATE INDEX IF NOT EXISTS idx_otp_verifications_email ON otp_verifications(email);
            CREATE INDEX IF NOT EXISTS idx_otp_verifications_phone ON otp_verifications(phone);
            CREATE INDEX IF NOT EXISTS idx_otp_verifications_expires ON otp_verifications(expires_at);
        `);

        console.log('✅ Migration completed successfully!');
        console.log('\n📋 Summary:');
        console.log('- Redesigned user management schema');
        console.log('- Migrated existing user-company relationships');
        console.log('- Added OTP verification support');
        console.log('- Created performance indexes');

    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    }
}

// Run migration
migrateAuthSchema()
    .then(() => {
        console.log('\n🎉 Migration script completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Migration script failed:', error);
        process.exit(1);
    });
