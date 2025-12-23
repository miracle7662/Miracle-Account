const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Get all users based on current user's role and company access
exports.getUsers = (req, res) => {
    try {
        const user = req.user; // From JWT middleware

        let query = `
            SELECT DISTINCT u.*,
                   GROUP_CONCAT(DISTINCT c.company_name) as companies,
                   GROUP_CONCAT(DISTINCT uc.role_in_company) as roles_in_companies
            FROM mst_users u
            LEFT JOIN user_companies uc ON u.userid = uc.userid AND uc.is_active = 1
            LEFT JOIN companymaster c ON uc.companyid = c.companyid AND c.status = 1
        `;

        const params = [];
        let whereConditions = ['u.status = 1'];

        // Filter based on role and company access
        if (user.role_level === 'superadmin') {
            // SuperAdmin can see all users
        } else {
            // Regular users can only see users in companies they have access to
            query += `
                INNER JOIN user_companies uc2 ON u.userid = uc2.userid
                WHERE uc2.companyid IN (
                    SELECT companyid FROM user_companies WHERE userid = ? AND is_active = 1
                )
            `;
            params.push(user.userid);
            whereConditions = ['u.status = 1'];
        }

        query += ' WHERE ' + whereConditions.join(' AND ');
        query += ' GROUP BY u.userid ORDER BY u.created_date DESC';

        const users = db.prepare(query).all(...params);

        // Get detailed company relationships for each user
        const usersWithCompanies = users.map(user => {
            const userCompanies = db.prepare(`
                SELECT
                    uc.companyid,
                    c.company_name,
                    uc.role_in_company,
                    uc.assigned_date,
                    uc.is_active
                FROM user_companies uc
                JOIN companymaster c ON uc.companyid = c.companyid
                WHERE uc.userid = ? AND uc.is_active = 1
                ORDER BY c.company_name
            `).all(user.userid);

            return {
                ...user,
                companies: userCompanies
            };
        });

        res.json(usersWithCompanies);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create new user (Multi-company system)
exports.createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            full_name,
            phone,
            role_level,
            company_assignments, // Array of {companyid, role_in_company}
            parent_user_id,
            created_by_id
        } = req.body;

        const user = req.user; // From JWT middleware

        // Validate required fields
        if (!username || !email || !password || !full_name || !role_level) {
            return res.status(400).json({ message: 'Required fields missing' });
        }

        // Check if username or email already exists
        const existingUser = db.prepare('SELECT userid FROM mst_users WHERE username = ? OR email = ?').get(username, email);
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Validate company assignments
        if (!company_assignments || !Array.isArray(company_assignments) || company_assignments.length === 0) {
            return res.status(400).json({ message: 'At least one company assignment is required' });
        }

        // Check permissions for each company assignment
        for (const assignment of company_assignments) {
            if (!assignment.companyid || !assignment.role_in_company) {
                return res.status(400).json({ message: 'Company ID and role are required for each assignment' });
            }

            // Verify company exists
            const companyExists = db.prepare('SELECT companyid FROM companymaster WHERE companyid = ? AND status = 1').get(assignment.companyid);
            if (!companyExists) {
                return res.status(400).json({ message: `Company ${assignment.companyid} not found` });
            }

            // Check if user has permission to assign to this company
            let hasPermission = false;
            if (user.role_level === 'superadmin') {
                hasPermission = true;
            } else {
                const accessCheck = db.prepare(`
                    SELECT 1 FROM user_companies
                    WHERE userid = ? AND companyid = ? AND role_in_company IN ('owner', 'admin')
                `).get(user.userid, assignment.companyid);
                hasPermission = !!accessCheck;
            }

            if (!hasPermission) {
                return res.status(403).json({ message: `Insufficient permissions to assign users to company ${assignment.companyid}` });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Validate role hierarchy (simplified for multi-company)
        const canCreateRole = user.role_level === 'superadmin' ||
                             (user.role_level === 'admin' && ['user', 'accountant'].includes(role_level));
        if (!canCreateRole) {
            return res.status(403).json({ message: 'Cannot create user with this role level' });
        }

        // Create user
        const stmt = db.prepare(`
            INSERT INTO mst_users (
                username, email, password, full_name, phone, role_level,
                parent_user_id, created_by_id, created_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `);

        const result = stmt.run(
            username, email, hashedPassword, full_name, phone, role_level,
            parent_user_id || user.userid, user.userid
        );

        const newUserId = result.lastInsertRowid;

        // Assign user to companies
        const companyStmt = db.prepare(`
            INSERT INTO user_companies (
                userid, companyid, role_in_company, assigned_by, assigned_date, is_active
            ) VALUES (?, ?, ?, ?, datetime('now'), 1)
        `);

        for (const assignment of company_assignments) {
            companyStmt.run(newUserId, assignment.companyid, assignment.role_in_company, user.userid);
        }

        // Create default permissions based on role
        try {
            createDefaultPermissions(newUserId, role_level, user.userid);
        } catch (permError) {
            console.error('Error creating default permissions:', permError);
            // Don't fail the user creation if permissions fail
        }

        res.json({
            userid: newUserId,
            username,
            email,
            full_name,
            role_level,
            company_assignments
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

// Get user permissions (company-specific)
exports.getUserPermissions = (req, res) => {
    try {
        const { userid } = req.params;
        const { companyid } = req.query;
        const user = req.user; // From JWT middleware

        // Validate that user has access to this company
        let hasAccess = false;
        if (user.role_level === 'superadmin') {
            hasAccess = true;
        } else {
            const accessCheck = db.prepare(`
                SELECT 1 FROM user_companies
                WHERE userid = ? AND companyid = ? AND is_active = 1
            `).get(user.userid, companyid);
            hasAccess = !!accessCheck;
        }

        if (!hasAccess) {
            return res.status(403).json({ message: 'Insufficient permissions to view user permissions for this company' });
        }

        // Get user's role in the company
        const userRole = db.prepare(`
            SELECT role_in_company FROM user_companies
            WHERE userid = ? AND companyid = ? AND is_active = 1
        `).get(userid, companyid);

        if (!userRole) {
            return res.status(404).json({ message: 'User is not assigned to this company' });
        }

        // Get permissions based on user's role in the company
        const permissions = db.prepare(`
            SELECT module_name, can_view, can_create, can_edit, can_delete
            FROM mst_user_permissions
            WHERE userid = ? AND (companyid = ? OR companyid IS NULL)
            ORDER BY companyid DESC
        `).all(userid, companyid);

        // If no company-specific permissions, fall back to global permissions
        let finalPermissions = permissions;
        if (permissions.length === 0 || !permissions.some(p => p.companyid === companyid)) {
            // Use default permissions based on role
            finalPermissions = getDefaultPermissionsForRole(userRole.role_in_company);
        }

        res.json({
            userid: parseInt(userid),
            companyid: parseInt(companyid),
            role_in_company: userRole.role_in_company,
            permissions: finalPermissions
        });

    } catch (error) {
        console.error('Error fetching user permissions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user permissions (company-specific)
exports.updateUserPermissions = (req, res) => {
    try {
        const { userid } = req.params;
        const { companyid, permissions, updated_by_id } = req.body;
        const user = req.user; // From JWT middleware

        // Validate required fields
        if (!companyid || !permissions || !Array.isArray(permissions)) {
            return res.status(400).json({ message: 'Company ID and permissions array are required' });
        }

        // Check permissions - only superadmin or company admin/owner can update permissions
        let hasPermission = false;
        if (user.role_level === 'superadmin') {
            hasPermission = true;
        } else {
            const accessCheck = db.prepare(`
                SELECT 1 FROM user_companies
                WHERE userid = ? AND companyid = ? AND role_in_company IN ('owner', 'admin')
            `).get(user.userid, companyid);
            hasPermission = !!accessCheck;
        }

        if (!hasPermission) {
            return res.status(403).json({ message: 'Insufficient permissions to update user permissions for this company' });
        }

        // Verify user is assigned to this company
        const userAssignment = db.prepare(`
            SELECT role_in_company FROM user_companies
            WHERE userid = ? AND companyid = ? AND is_active = 1
        `).get(userid, companyid);

        if (!userAssignment) {
            return res.status(404).json({ message: 'User is not assigned to this company' });
        }

        // Delete existing company-specific permissions for this user and company
        db.prepare('DELETE FROM mst_user_permissions WHERE userid = ? AND companyid = ?').run(userid, companyid);

        // Insert new company-specific permissions
        const stmt = db.prepare(`
            INSERT INTO mst_user_permissions (
                userid, companyid, module_name, can_view, can_create, can_edit, can_delete, created_by_id, created_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `);

        permissions.forEach(permission => {
            stmt.run(
                userid,
                companyid,
                permission.module_name,
                permission.can_view ? 1 : 0,
                permission.can_create ? 1 : 0,
                permission.can_edit ? 1 : 0,
                permission.can_delete ? 1 : 0,
                updated_by_id
            );
        });

        res.json({
            message: 'Permissions updated successfully',
            userid: parseInt(userid),
            companyid: parseInt(companyid),
            permissions_count: permissions.length
        });

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

// Assign user to a company
exports.assignUserToCompany = (req, res) => {
    try {
        const { userid } = req.params;
        const { companyid, role_in_company } = req.body;
        const user = req.user; // From JWT middleware

        if (!companyid || !role_in_company) {
            return res.status(400).json({ message: 'Company ID and role are required' });
        }

        // Check if company exists
        const companyExists = db.prepare('SELECT companyid FROM companymaster WHERE companyid = ? AND status = 1').get(companyid);
        if (!companyExists) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Check if user exists
        const targetUser = db.prepare('SELECT userid FROM mst_users WHERE userid = ? AND status = 1').get(userid);
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check permissions
        let hasPermission = false;
        if (user.role_level === 'superadmin') {
            hasPermission = true;
        } else {
            const accessCheck = db.prepare(`
                SELECT 1 FROM user_companies
                WHERE userid = ? AND companyid = ? AND role_in_company IN ('owner', 'admin')
            `).get(user.userid, companyid);
            hasPermission = !!accessCheck;
        }

        if (!hasPermission) {
            return res.status(403).json({ message: 'Insufficient permissions to assign users to this company' });
        }

        // Check if user is already assigned to this company
        const existingAssignment = db.prepare(`
            SELECT id FROM user_companies
            WHERE userid = ? AND companyid = ? AND is_active = 1
        `).get(userid, companyid);

        if (existingAssignment) {
            return res.status(400).json({ message: 'User is already assigned to this company' });
        }

        // Assign user to company
        const stmt = db.prepare(`
            INSERT INTO user_companies (
                userid, companyid, role_in_company, assigned_by, assigned_date, is_active
            ) VALUES (?, ?, ?, ?, datetime('now'), 1)
        `);

        stmt.run(userid, companyid, role_in_company, user.userid);

        res.json({ message: 'User assigned to company successfully' });

    } catch (error) {
        console.error('Error assigning user to company:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Remove user from a company
exports.removeUserFromCompany = (req, res) => {
    try {
        const { userid, companyid } = req.params;
        const user = req.user; // From JWT middleware

        // Check permissions
        let hasPermission = false;
        if (user.role_level === 'superadmin') {
            hasPermission = true;
        } else {
            const accessCheck = db.prepare(`
                SELECT 1 FROM user_companies
                WHERE userid = ? AND companyid = ? AND role_in_company IN ('owner', 'admin')
            `).get(user.userid, companyid);
            hasPermission = !!accessCheck;
        }

        if (!hasPermission) {
            return res.status(403).json({ message: 'Insufficient permissions to remove users from this company' });
        }

        // Soft delete the assignment
        const stmt = db.prepare(`
            UPDATE user_companies
            SET is_active = 0, removed_by = ?, removed_date = datetime('now')
            WHERE userid = ? AND companyid = ? AND is_active = 1
        `);

        const result = stmt.run(user.userid, userid, companyid);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'User is not assigned to this company' });
        }

        res.json({ message: 'User removed from company successfully' });

    } catch (error) {
        console.error('Error removing user from company:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user's role in a company
exports.updateUserCompanyRole = (req, res) => {
    try {
        const { userid, companyid } = req.params;
        const { role_in_company } = req.body;
        const user = req.user; // From JWT middleware

        if (!role_in_company) {
            return res.status(400).json({ message: 'Role is required' });
        }

        // Check permissions
        let hasPermission = false;
        if (user.role_level === 'superadmin') {
            hasPermission = true;
        } else {
            const accessCheck = db.prepare(`
                SELECT 1 FROM user_companies
                WHERE userid = ? AND companyid = ? AND role_in_company = 'owner'
            `).get(user.userid, companyid);
            hasPermission = !!accessCheck;
        }

        if (!hasPermission) {
            return res.status(403).json({ message: 'Insufficient permissions to update user roles in this company' });
        }

        // Update the role
        const stmt = db.prepare(`
            UPDATE user_companies
            SET role_in_company = ?, updated_by = ?, updated_date = datetime('now')
            WHERE userid = ? AND companyid = ? AND is_active = 1
        `);

        const result = stmt.run(role_in_company, user.userid, userid, companyid);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'User is not assigned to this company' });
        }

        res.json({ message: 'User role updated successfully' });

    } catch (error) {
        console.error('Error updating user company role:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get user's company assignments
exports.getUserCompanyAssignments = (req, res) => {
    try {
        const { userid } = req.params;
        const user = req.user; // From JWT middleware

        // Check if current user can view this user's assignments
        let canView = false;
        if (user.role_level === 'superadmin') {
            canView = true;
        } else if (user.userid === parseInt(userid)) {
            canView = true; // Users can view their own assignments
        } else {
            // Check if they share any companies
            const sharedCompanyCheck = db.prepare(`
                SELECT 1 FROM user_companies uc1
                JOIN user_companies uc2 ON uc1.companyid = uc2.companyid
                WHERE uc1.userid = ? AND uc2.userid = ? AND uc1.is_active = 1 AND uc2.is_active = 1
                LIMIT 1
            `).get(user.userid, userid);
            canView = !!sharedCompanyCheck;
        }

        if (!canView) {
            return res.status(403).json({ message: 'Insufficient permissions to view user assignments' });
        }

        // Get user's company assignments
        const assignments = db.prepare(`
            SELECT
                uc.*,
                c.company_name,
                y.yearid,
                y.Year as year_name,
                y.Startdate,
                y.Enddate
            FROM user_companies uc
            JOIN companymaster c ON uc.companyid = c.companyid
            CROSS JOIN yearmaster y
            WHERE uc.userid = ? AND uc.is_active = 1 AND c.status = 1 AND y.status = 1
            ORDER BY c.company_name, y.Year
        `).all(userid);

        res.json({ assignments });

    } catch (error) {
        console.error('Error fetching user company assignments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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
        'admin': {
            'orders': { view: 1, create: 1, edit: 1, delete: 0 },
            'customers': { view: 1, create: 1, edit: 1, delete: 0 },
            'menu': { view: 1, create: 1, edit: 1, delete: 0 },
            'reports': { view: 1, create: 0, edit: 0, delete: 0 },
            'users': { view: 1, create: 1, edit: 1, delete: 0 },
            'settings': { view: 1, create: 0, edit: 1, delete: 0 }
        },
        'user': {
            'orders': { view: 1, create: 1, edit: 0, delete: 0 },
            'customers': { view: 1, create: 1, edit: 0, delete: 0 },
            'menu': { view: 1, create: 0, edit: 0, delete: 0 },
            'reports': { view: 1, create: 0, edit: 0, delete: 0 },
            'users': { view: 0, create: 0, edit: 0, delete: 0 },
            'settings': { view: 0, create: 0, edit: 0, delete: 0 }
        },
        'accountant': {
            'orders': { view: 1, create: 0, edit: 0, delete: 0 },
            'customers': { view: 1, create: 0, edit: 0, delete: 0 },
            'menu': { view: 1, create: 0, edit: 0, delete: 0 },
            'reports': { view: 1, create: 1, edit: 1, delete: 0 },
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

// Helper function to get default permissions for a role
function getDefaultPermissionsForRole(roleInCompany) {
    const defaultPermissions = {
        'owner': {
            'orders': { view: 1, create: 1, edit: 1, delete: 1 },
            'customers': { view: 1, create: 1, edit: 1, delete: 1 },
            'menu': { view: 1, create: 1, edit: 1, delete: 1 },
            'reports': { view: 1, create: 1, edit: 1, delete: 1 },
            'users': { view: 1, create: 1, edit: 1, delete: 1 },
            'settings': { view: 1, create: 1, edit: 1, delete: 1 }
        },
        'admin': {
            'orders': { view: 1, create: 1, edit: 1, delete: 0 },
            'customers': { view: 1, create: 1, edit: 1, delete: 0 },
            'menu': { view: 1, create: 1, edit: 1, delete: 0 },
            'reports': { view: 1, create: 0, edit: 0, delete: 0 },
            'users': { view: 1, create: 1, edit: 1, delete: 0 },
            'settings': { view: 1, create: 0, edit: 1, delete: 0 }
        },
        'user': {
            'orders': { view: 1, create: 1, edit: 0, delete: 0 },
            'customers': { view: 1, create: 1, edit: 0, delete: 0 },
            'menu': { view: 1, create: 0, edit: 0, delete: 0 },
            'reports': { view: 1, create: 0, edit: 0, delete: 0 },
            'users': { view: 0, create: 0, edit: 0, delete: 0 },
            'settings': { view: 0, create: 0, edit: 0, delete: 0 }
        },
        'accountant': {
            'orders': { view: 1, create: 0, edit: 0, delete: 0 },
            'customers': { view: 1, create: 0, edit: 0, delete: 0 },
            'menu': { view: 1, create: 0, edit: 0, delete: 0 },
            'reports': { view: 1, create: 1, edit: 1, delete: 0 },
            'users': { view: 0, create: 0, edit: 0, delete: 0 },
            'settings': { view: 0, create: 0, edit: 0, delete: 0 }
        }
    };

    const permissions = defaultPermissions[roleInCompany] || defaultPermissions['user'];
    return Object.entries(permissions).map(([module, perms]) => ({
        module_name: module,
        can_view: perms.view,
        can_create: perms.create,
        can_edit: perms.edit,
        can_delete: perms.delete
    }));
}
