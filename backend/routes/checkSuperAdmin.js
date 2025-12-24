const db = require('./config/db');
const bcrypt = require('bcrypt');

async function checkAndCreateSuperAdmin() {
    try {
        console.log('🔍 Checking for SuperAdmin user...');
        
        // Check if SuperAdmin exists
        const existingSuperAdmin = db.prepare('SELECT userid, username, email, role_level FROM mst_users WHERE role_level = ?').get('superadmin');
        
        if (existingSuperAdmin) {
            console.log('✅ SuperAdmin already exists:');
            console.log('   User ID:', existingSuperAdmin.userid);
            console.log('   Username:', existingSuperAdmin.username);
            console.log('   Email:', existingSuperAdmin.email);
            console.log('   Role:', existingSuperAdmin.role_level);
        } else {
            console.log('❌ SuperAdmin not found. Creating...');
            
            // Create hashed password
            const hashedPassword = await bcrypt.hash('superadmin123', 10);
            
            // Insert SuperAdmin
            const stmt = db.prepare(`
                INSERT INTO mst_users (
                    username, email, password, full_name, role_level, 
                    is_active, created_date
                ) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
            `);
            
            const result = stmt.run(
                'superadmin',
                'superadmin@miracle.com',
                hashedPassword,
                'Super Administrator',
                'superadmin',
                1
            );

            console.log('✅ SuperAdmin created successfully!');
            console.log('   User ID:', result.lastInsertRowid);
            console.log('   Email: superadmin@miracle.com');
            console.log('   Password: superadmin123');
            
            // Create default permissions
            const defaultPermissions = {
                'orders': { view: 1, create: 1, edit: 1, delete: 1 },
                'customers': { view: 1, create: 1, edit: 1, delete: 1 },
                'menu': { view: 1, create: 1, edit: 1, delete: 1 },
                'reports': { view: 1, create: 1, edit: 1, delete: 1 },
                'users': { view: 1, create: 1, edit: 1, delete: 1 },
                'settings': { view: 1, create: 1, edit: 1, delete: 1 }
            };

            const permStmt = db.prepare(`
                INSERT INTO mst_user_permissions (
                    userid, module_name, can_view, can_create, can_edit, can_delete, created_by_id, created_date
                ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
            `);

            Object.entries(defaultPermissions).forEach(([module, perms]) => {
                permStmt.run(
                    result.lastInsertRowid,
                    module,
                    perms.view ? 1 : 0,
                    perms.create ? 1 : 0,
                    perms.edit ? 1 : 0,
                    perms.delete ? 1 : 0,
                    result.lastInsertRowid
                );
            });

            console.log('✅ Default permissions created for SuperAdmin');
        }
        
        // Test login
        console.log('\n🔐 Testing login...');
        const testUser = db.prepare('SELECT userid, username, email, password, role_level FROM mst_users WHERE email = ?').get('superadmin@miracle.com');
        
        if (testUser) {
            const isValidPassword = await bcrypt.compare('superadmin123', testUser.password);
            if (isValidPassword) {
                console.log('✅ Login test successful!');
                console.log('   You can now login with:');
                console.log('   Email: superadmin@miracle.com');
                console.log('   Password: superadmin123');
            } else {
                console.log('❌ Password verification failed');
            }
        } else {
            console.log('❌ User not found in database');
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Run the check
checkAndCreateSuperAdmin(); 