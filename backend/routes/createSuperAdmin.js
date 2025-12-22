import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
const dbPath = path.join(__dirname, 'config', 'miresto.db');
const db = new Database(dbPath);

console.log('🔧 Creating SuperAdmin...\n');

try {
    // Check if SuperAdmin exists
    const existingSuperAdmin = db.prepare('SELECT userid FROM mst_users WHERE role_level = ?').get('superadmin');
    
    if (!existingSuperAdmin) {
        console.log('Creating initial SuperAdmin...');
        const hashedPassword = await bcrypt.hash('superadmin123', 10);
        
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

        // Create default permissions for SuperAdmin
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

        console.log('✅ Initial SuperAdmin created successfully');
        console.log('📧 Email: superadmin@miracle.com');
        console.log('🔑 Password: superadmin123');
    } else {
        console.log('ℹ️ SuperAdmin already exists');
    }

} catch (error) {
    console.error('❌ Error creating SuperAdmin:', error);
} finally {
    db.close();
} 