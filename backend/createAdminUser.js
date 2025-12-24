const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

// Connect to the database (same as db.js)
const dbPath = path.join('D:', 'Restaurant_Database', 'panmandi.db');
const db = new Database(dbPath);

console.log('🔧 Creating Admin user...\n');

(async () => {
    try {
        // Check if Admin user exists
        const existingAdmin = db.prepare('SELECT userid FROM mst_users WHERE username = ?').get('Admin');

        if (!existingAdmin) {
            console.log('Creating Admin user...');
            const hashedPassword = await bcrypt.hash('admin', 10);

            const stmt = db.prepare(`
                INSERT INTO mst_users (
                    username, email, password, full_name, role_level,
                    status, created_date
                ) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
            `);

            const result = stmt.run(
                'Admin',
                'admin@example.com',
                hashedPassword,
                'Administrator',
                'superadmin',
                1
            );

            console.log('✅ Admin user created successfully');
            console.log('📧 Email: admin@example.com');
            console.log('🔑 Password: admin');
        } else {
            console.log('ℹ️ Admin user already exists');
        }
    } catch (error) {
        console.error('❌ Error creating Admin user:', error);
    } finally {
        db.close();
    }
})();
