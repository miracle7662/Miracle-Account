const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Get all users based on current user's role and hierarchy
exports.getUsers = (req, res) => {
    try {
        const { currentUserId, roleLevel, brandId, hotelid } = req.query;
        
        let query = `
            SELECT u.*, 
                   b.hotel_name as brand_name,
                   h.hotel_name as hotel_name
            FROM mst_users u
            LEFT JOIN msthotelmasters b ON u.brand_id = b.hotelid
            LEFT JOIN msthotelmasters h ON u.hotelid = h.hotelid
            WHERE u.is_active = 0
        `;
        
        const params = [];
        
        // Filter based on role hierarchy
        switch(roleLevel) {
            case 'superadmin':
                // SuperAdmin can see all users
                break;
            case 'brand_admin':
                // Brand Admin can see users under their brand
                query += ' AND u.brand_id = ?';
                params.push(brandId);
                break;
            case 'hotel_admin':
                // Hotel Admin can see users under their hotel
                query += ' AND u.hotelid = ?';
                params.push(hotelid);
                break;
            default:
                return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        query += ' ORDER BY u.created_date DESC';
        
        const users = db.prepare(query).all(...params);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create new user
exports.createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            full_name,
            phone,
            role_level,
            brand_id,
            hotelid,
            parent_user_id,
            created_by_id
        } = req.body;

        // Debug: Log the received data
        console.log('Received user creation request:');
        console.log('Request body:', req.body);
        console.log('brand_id:', brand_id, 'type:', typeof brand_id);
        console.log('hotelid:', hotelid, 'type:', typeof hotelid);
        console.log('parent_user_id:', parent_user_id, 'type:', typeof parent_user_id);

        // Validate required fields
        if (!username || !email || !password || !full_name || !role_level) {
            return res.status(400).json({ message: 'Required fields missing' });
        }

        // Check if username or email already exists
        const existingUser = db.prepare('SELECT userid FROM mst_users WHERE username = ? OR email = ?').get(username, email);
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Validate that the hotel exists (for hotel_admin role)
        if (role_level === 'hotel_admin' && hotelid) {
            const hotelExists = db.prepare('SELECT hotelid FROM msthotelmasters WHERE hotelid = ?').get(hotelid);
            if (!hotelExists) {
                console.error('Hotel not found with ID:', hotelid);
                return res.status(400).json({ message: 'Hotel not found with the provided ID' });
            }
            console.log('Hotel found:', hotelExists);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Validate role hierarchy
        console.log('Parent user ID:', parent_user_id);
        const parentUser = db.prepare('SELECT role_level, brand_id, hotelid FROM mst_users WHERE userid = ?').get(parent_user_id);
        console.log('Parent user found:', parentUser);
        
        if (!parentUser) {
            return res.status(400).json({ message: 'Invalid parent user' });
        }

        // For SuperAdmin, created_by_id can be null or the same as parent_user_id
        // Let's use parent_user_id for created_by_id to avoid foreign key issues
        const finalCreatedById = parent_user_id;

        // Role hierarchy validation
        const canCreateRole = validateRoleHierarchy(parentUser.role_level, role_level);
        if (!canCreateRole) {
            return res.status(403).json({ message: 'Cannot create user with this role level' });
        }

        // Set brand_id and hotel_id based on role and parent
        let finalBrandId = brand_id;
        let finalHotelId = hotelid;

        if (role_level === 'brand_admin') {
            // For brand_admin, brand_id must reference a valid hotel in HotelMasters
            if (!brand_id) {
                return res.status(400).json({ message: 'Brand ID is required for brand_admin role' });
            }
            
            // Validate that the brand/hotel exists
            const brandExists = db.prepare('SELECT hotelid FROM msthotelmasters WHERE hotelid = ?').get(brand_id);
            if (!brandExists) {
                console.error('Brand/Hotel not found with ID:', brand_id);
                return res.status(400).json({ message: 'Brand/Hotel not found with the provided ID' });
            }
            
            finalBrandId = brand_id;
            finalHotelId = null;
        } else if (role_level === 'hotel_admin' || role_level === 'hotel_user') {
            // For hotel_admin and hotel_user, brand_id should be the same as hotel_id
            // since they are managing a specific hotel
            finalBrandId = hotelid || parentUser.hotelid;
            finalHotelId = hotelid || parentUser.hotelid;
            
            // Validate that the hotel exists
            if (finalHotelId) {
                const hotelExists = db.prepare('SELECT hotelid FROM msthotelmasters WHERE hotelid = ?').get(finalHotelId);
                if (!hotelExists) {
                    console.error('Hotel not found with ID:', finalHotelId);
                    return res.status(400).json({ message: 'Hotel not found with the provided ID' });
                }
            }
        }

        const stmt = db.prepare(`
            INSERT INTO mst_users (
                username, email, password, full_name, phone, role_level,
                parent_user_id,hotelid, brand_id, created_by_id, created_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `);

        console.log('About to insert user with values:', {
            username, email, full_name, phone, role_level,
            parent_user_id, finalHotelId, created_by_id
        });
        console.log('Final values - finalBrandId:', finalBrandId, 'finalHotelId:', finalHotelId);

        const result = stmt.run(
            username, email, hashedPassword, full_name, phone, role_level,
            parent_user_id, finalHotelId, finalBrandId, finalCreatedById
        );

        console.log('User created successfully with ID:', result.lastInsertRowid);

        // Create default permissions based on role
        try {
            createDefaultPermissions(result.lastInsertRowid, role_level, finalCreatedById);
            console.log('Default permissions created successfully');
        } catch (permError) {
            console.error('Error creating default permissions:', permError);
            // Don't fail the user creation if permissions fail
        }

        res.json({
            userid: result.lastInsertRowid,
            username,
            email,
            full_name,
            role_level,
            brand_id: finalBrandId,
            hotelid: finalHotelId
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const {
            full_name,
            phone,
            role_level,
            is_active,
            updated_by_id
        } = req.body;

        const updateFields = [];
        const params = [];

        if (full_name) {
            updateFields.push('full_name = ?');
            params.push(full_name);
        }
        if (phone !== undefined) {
            updateFields.push('phone = ?');
            params.push(phone);
        }
        if (role_level) {
            updateFields.push('role_level = ?');
            params.push(role_level);
        }
        if (is_active !== undefined) {
            updateFields.push('is_active = ?');
            params.push(is_active);
        }

        updateFields.push('updated_by_id = ?');
                    updateFields.push('updated_date = datetime(\'now\')');
        params.push(updated_by_id, userid);

        const stmt = db.prepare(`UPDATE mst_users SET ${updateFields.join(', ')} WHERE userid = ?`);
        stmt.run(...params);

        res.json({ message: 'User updated successfully' });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete user (soft delete)
exports.deleteUser = (req, res) => {
    try {
        const { userid } = req.params;
        const { updated_by_id } = req.body;

        const stmt = db.prepare('UPDATE mst_users SET is_active = 0, updated_by_id = ?, updated_date = datetime(\'now\') WHERE userid = ?');
        stmt.run(updated_by_id, userid);

        res.json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get user permissions
exports.getUserPermissions = (req, res) => {
    try {
        const { userid } = req.params;
        
        const permissions = db.prepare(`
            SELECT module_name, can_view, can_create, can_edit, can_delete
            FROM mst_user_permissions
            WHERE userid = ?
        `).all(userid);

        res.json(permissions);

    } catch (error) {
        console.error('Error fetching user permissions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user permissions
exports.updateUserPermissions = (req, res) => {
    try {
        const { userid } = req.params;
        const { permissions, updated_by_id } = req.body;

        // Delete existing permissions
        db.prepare('DELETE FROM mst_user_permissions WHERE userid = ?').run(userid);

        // Insert new permissions
        const stmt = db.prepare(`
            INSERT INTO mst_user_permissions (
                userid, module_name, can_view, can_create, can_edit, can_delete, created_by_id, created_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `);

        permissions.forEach(permission => {
            stmt.run(
                userid,
                permission.module_name,
                permission.can_view ? 1 : 0,
                permission.can_create ? 1 : 0,
                permission.can_edit ? 1 : 0,
                permission.can_delete ? 1 : 0,
                updated_by_id
            );
        });

        res.json({ message: 'Permissions updated successfully' });

    } catch (error) {
        console.error('Error updating user permissions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Helper function to validate role hierarchy
function validateRoleHierarchy(parentRole, childRole) {
    const roleHierarchy = {
        'superadmin': ['brand_admin', 'hotel_admin', 'hotel_user'],
        'brand_admin': ['hotel_admin', 'hotel_user'],
        'hotel_admin': ['hotel_user'],
        'hotel_user': []
    };

    return roleHierarchy[parentRole]?.includes(childRole) || false;
}

// Helper function to create default permissions
function createDefaultPermissions(userid, roleLevel, createdBy) {
    const defaultPermissions = {
        'superadmin': {
            'orders': { view: 1, create: 1, edit: 1, delete: 1 },
            'customers': { view: 1, create: 1, edit: 1, delete: 1 },
            'menu': { view: 1, create: 1, edit: 1, delete: 1 },
            'reports': { view: 1, create: 1, edit: 1, delete: 1 },
            'users': { view: 1, create: 1, edit: 1, delete: 1 },
            'settings': { view: 1, create: 1, edit: 1, delete: 1 }
        },
        'brand_admin': {
            'orders': { view: 1, create: 1, edit: 1, delete: 0 },
            'customers': { view: 1, create: 1, edit: 1, delete: 0 },
            'menu': { view: 1, create: 1, edit: 1, delete: 0 },
            'reports': { view: 1, create: 0, edit: 0, delete: 0 },
            'users': { view: 1, create: 1, edit: 1, delete: 0 },
            'settings': { view: 1, create: 0, edit: 1, delete: 0 }
        },
        'hotel_admin': {
            'orders': { view: 1, create: 1, edit: 1, delete: 0 },
            'customers': { view: 1, create: 1, edit: 1, delete: 0 },
            'menu': { view: 1, create: 1, edit: 1, delete: 0 },
            'reports': { view: 1, create: 0, edit: 0, delete: 0 },
            'users': { view: 1, create: 1, edit: 1, delete: 0 },
            'settings': { view: 1, create: 0, edit: 1, delete: 0 }
        },
        'hotel_user': {
            'orders': { view: 1, create: 1, edit: 0, delete: 0 },
            'customers': { view: 1, create: 1, edit: 0, delete: 0 },
            'menu': { view: 1, create: 0, edit: 0, delete: 0 },
            'reports': { view: 1, create: 0, edit: 0, delete: 0 },
            'users': { view: 0, create: 0, edit: 0, delete: 0 },
            'settings': { view: 0, create: 0, edit: 0, delete: 0 }
        }
    };

    const permissions = defaultPermissions[roleLevel] || {};
    const stmt = db.prepare(`
        INSERT INTO mst_user_permissions (
            userid, module_name, can_view, can_create, can_edit, can_delete, created_by_id, created_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);

    Object.entries(permissions).forEach(([module, perms]) => {
        stmt.run(
            userid,
            module,
            perms.view ? 1 : 0,
            perms.create ? 1 : 0,
            perms.edit ? 1 : 0,
            perms.delete ? 1 : 0,
            createdBy
        );
    });
}