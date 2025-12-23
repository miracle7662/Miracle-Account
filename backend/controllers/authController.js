const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Middleware to authenticate JWT token
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = user; // save decoded token data
        next();
    });
};

// Login user (Tally-like: login first, then select company)
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        // Find user by username only
        const user = db.prepare(`
            SELECT u.*
            FROM mst_users u
            WHERE u.username = ? AND u.status = 1
        `).get(username);

        if (!user) {
            return res.status(401).json({ message: 'Invalid login credentials' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid login credentials' });
        }

        // Update last login
        db.prepare('UPDATE mst_users SET last_login = datetime(\'now\') WHERE userid = ?').run(user.userid);

        // Get user's accessible companies
        let userCompanies = [];
        if (user.role_level === 'SUPER_ADMIN') {
            // SuperAdmin can access all companies
            userCompanies = db.prepare(`
                SELECT
                    c.companyid,
                    c.company_name,
                    'OWNER' as role_in_company,
                    y.yearid,
                    y.Year as year_name,
                    y.Startdate,
                    y.Enddate
                FROM companymaster c
                CROSS JOIN yearmaster y
                WHERE c.status = 1 AND y.status = 1
                ORDER BY c.company_name, y.Year
            `).all();
        } else {
            // Regular users: get companies they have access to
            userCompanies = db.prepare(`
                SELECT
                    uc.companyid,
                    c.company_name,
                    uc.role_in_company,
                    y.yearid,
                    y.Year as year_name,
                    y.Startdate,
                    y.Enddate
                FROM user_companies uc
                JOIN companymaster c ON uc.companyid = c.companyid
                CROSS JOIN yearmaster y
                WHERE uc.userid = ? AND uc.is_active = 1 AND c.status = 1 AND y.status = 1
                ORDER BY c.company_name, y.Year
            `).all(user.userid);
        }

        // Create JWT token (without company context - will be added later)
        const token = jwt.sign(
            {
                userid: user.userid,
                username: user.username,
                role_level: user.role_level,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token: token,
            user: {
                userid: user.userid,
                username: user.username,
                full_name: user.full_name,
                email: user.email,
                role_level: user.role_level,
                email_verified: user.email_verified,
                phone_verified: user.phone_verified
            },
            companies: userCompanies
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Select company and year after login (Tally-like company selection)
exports.selectCompany = (req, res) => {
    try {
        const { companyid, yearid } = req.body;
        const user = req.user; // From JWT middleware

        if (!companyid || !yearid) {
            return res.status(400).json({ message: 'Company and year selection required' });
        }

        // Verify user has access to this company
        let hasAccess = false;
        if (user.role_level === 'SUPER_ADMIN') {
            hasAccess = true;
        } else {
            const accessCheck = db.prepare(`
                SELECT 1 FROM user_companies
                WHERE userid = ? AND companyid = ? AND is_active = 1
            `).get(user.userid, companyid);
            hasAccess = !!accessCheck;
        }

        if (!hasAccess) {
            return res.status(403).json({ message: 'Access denied to this company' });
        }

        // Get company and year details
        const companyData = db.prepare(`
            SELECT c.*, y.Year as year_name, y.Startdate, y.Enddate
            FROM companymaster c
            JOIN yearmaster y ON y.yearid = ?
            WHERE c.companyid = ?
        `).get(yearid, companyid);

        if (!companyData) {
            return res.status(404).json({ message: 'Company or year not found' });
        }

        // Create company-specific JWT token
        const companyToken = jwt.sign(
            {
                userid: user.userid,
                username: user.username,
                role_level: user.role_level,
                email: user.email,
                companyid: companyid,
                yearid: yearid,
                company_name: companyData.company_name,
                year_name: companyData.year_name
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Company selected successfully',
            token: companyToken,
            company: {
                companyid: companyData.companyid,
                company_name: companyData.company_name,
                yearid: yearid,
                year_name: companyData.year_name,
                start_date: companyData.Startdate,
                end_date: companyData.Enddate
            }
        });

    } catch (error) {
        console.error('Company selection error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get user's accessible companies (for company selection screen)
exports.getUserCompanies = (req, res) => {
    try {
        const user = req.user; // From JWT middleware

        let userCompanies = [];
        if (user.role_level === 'SUPER_ADMIN') {
            // SuperAdmin can access all companies
            userCompanies = db.prepare(`
                SELECT
                    c.companyid,
                    c.company_name,
                    'OWNER' as role_in_company,
                    y.yearid,
                    y.Year as year_name,
                    y.Startdate,
                    y.Enddate
                FROM companymaster c
                CROSS JOIN yearmaster y
                WHERE c.status = 1 AND y.status = 1
                ORDER BY c.company_name, y.Year
            `).all();
        } else {
            // Regular users: get companies they have access to
            userCompanies = db.prepare(`
                SELECT
                    uc.companyid,
                    c.company_name,
                    uc.role_in_company,
                    y.yearid,
                    y.Year as year_name,
                    y.Startdate,
                    y.Enddate
                FROM user_companies uc
                JOIN companymaster c ON uc.companyid = c.companyid
                CROSS JOIN yearmaster y
                WHERE uc.userid = ? AND uc.is_active = 1 AND c.status = 1 AND y.status = 1
                ORDER BY c.company_name, y.Year
            `).all(user.userid);
        }

        res.json({
            companies: userCompanies
        });

    } catch (error) {
        console.error('Get user companies error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get current user info
exports.getCurrentUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = db.prepare(`
              SELECT u.*
            FROM mst_users u
            WHERE u.userid = ? AND u.status = 1
        `).get(decoded.userid);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const userResponse = {
            id: user.userid,
            username: user.username,
            email: user.email,
            name: user.full_name,
            role: user.role_level,
            role_level: user.role_level,
            companyName: decoded.companyName || null,
            year: decoded.year || null,
            companyid: decoded.companyid || null,
            yearid: decoded.yearid || null
        };

        res.json(userResponse);

    } catch (error) {
        console.error('Get current user error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Verify password for F8 action on billed tables (current implementation)
exports.verifyF8Password = async (req, res) => {
    try {
        const { password } = req.body;
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Get user details
        const user = db.prepare(`
            SELECT u.*
            FROM mst_users u
            WHERE u.userid = ? AND u.status = 1
        `).get(decoded.userid);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // Allow only admins to perform this action
        if (user.role_level !== 'ADMIN' && user.role_level !== 'SUPER_ADMIN') {
            return res.status(403).json({ success: false, message: 'Permission denied. Only admins can perform this action.' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        res.json({ success: true, message: 'Password verified successfully' });

    } catch (error) {
        console.error('F8 password verification error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Verify password of the user who created the bill for F8 action on billed tables
exports.verifyBillCreatorPassword = async (req, res) => {
    try {
        const { password, txnId } = req.body;
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }

        if (!txnId) {
            return res.status(400).json({ success: false, message: 'Transaction ID is required' });
        }

        // Verify JWT token to get current user
        const decoded = jwt.verify(token, JWT_SECRET);

        // Get current user details (for logging purposes)
        const currentUser = db.prepare(`
            SELECT u.*
            FROM mst_users u
           
            WHERE u.userid = ? AND u.status = 1
        `).get(decoded.userid);

        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'Current user not found' });
        }

        // Find the transaction and get the UserId (which is the creator)
        const transaction = db.prepare(`
            SELECT TxnID, UserId
            FROM TAxnTrnbill
            WHERE TxnID = ?
        `).get(txnId);

        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

        if (!transaction.UserId) {
            return res.status(400).json({ success: false, message: 'Bill creator information not available for this transaction.' });
        }

        // Get the bill creator's details
        const billCreator = db.prepare(`
            SELECT u.*
            FROM mst_users u
          
            WHERE u.userid = ? AND u.status = 1
        `).get(transaction.UserId);

        if (!billCreator) {
            return res.status(404).json({ success: false, message: 'Bill creator not found' });
        }

        // If the current user is an admin, try their password first.
        if (currentUser.role_level === 'ADMIN' || currentUser.role_level === 'SUPER_ADMIN') {
            const isAdminPasswordValid = await bcrypt.compare(password, currentUser.password);
            if (isAdminPasswordValid) {
                return res.json({ success: true, message: 'Admin password verified successfully.' });
            }
        }
        
        // If the current user is not an admin or their password was incorrect,
        // check the password of the user who created the bill.
        const isValidPassword = await bcrypt.compare(password, billCreator.password);
        if (!isValidPassword) {
            // If that fails, check the password of the admin who created the bill creator.
            if (billCreator.created_by_id) {
                const creatorAdmin = db.prepare('SELECT password FROM mst_users WHERE userid = ?').get(billCreator.created_by_id);
                if (creatorAdmin) {
                    const isCreatorAdminPasswordValid = await bcrypt.compare(password, creatorAdmin.password);
                    if (isCreatorAdminPasswordValid) {
                        return res.json({ success: true, message: 'Creator admin password verified successfully.' });
                    }
                }
            }
            return res.status(401).json({ success: false, message: 'Invalid Password' });
        }

        // Log the verification attempt
        console.log('🔐 Bill Creator Password Verification:');
        console.log('   Current User ID:', currentUser.userid);
        console.log('   Current Username:', currentUser.username);
        console.log('   Bill Creator ID:', billCreator.userid);
        console.log('   Bill Creator Username:', billCreator.username);
        console.log('   Transaction ID:', txnId);
        console.log('   Verification Time:', new Date().toISOString());
        console.log('   ---');

        res.json({
            success: true,
            message: 'Bill creator password verified successfully',
            billCreator: {
                id: billCreator.userid,
                username: billCreator.username,
                name: billCreator.full_name,
                role_level: billCreator.role_level
            }
        });

    } catch (error) {
        console.error('Bill creator password verification error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Verify password for handover access
exports.verifyPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Get user details
        const user = db.prepare(`
            SELECT u.*
            FROM mst_users u
           
            WHERE u.userid = ? AND u.status = 1
        `).get(decoded.userid);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        res.json({ success: true, message: 'Password verified successfully' });

    } catch (error) {
        console.error('Password verification error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Verify password of the user's creator (e.g., Hotel Admin for an Outlet User)
exports.verifyCreatorPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }

        // Verify JWT to get current user's ID
        const decoded = jwt.verify(token, JWT_SECRET);

        // Get current user's full details
        const currentUserInfo = db.prepare('SELECT userid, password, role_level, created_by_id FROM mst_users WHERE userid = ?').get(decoded.userid);

        if (!currentUserInfo) {
            return res.status(404).json({ success: false, message: 'Current user not found.' });
        }

        // 1. First, try to verify against the current user's own password.
        // This allows any user (including outlet users) to use their own password.
        const isCurrentUserPasswordValid = await bcrypt.compare(password, currentUserInfo.password);
        if (isCurrentUserPasswordValid) {
            return res.json({ success: true, message: 'Password verified successfully.' });
        }

        // 2. If the current user's password fails, and they are an admin, we can stop here
        // because we already checked their password. If they aren't an admin, we proceed
        // to check their creator's password as a fallback.
        if (currentUserInfo.role_level === 'ADMIN' || currentUserInfo.role_level === 'SUPER_ADMIN') {
            return res.status(401).json({ success: false, message: 'Invalid Password' });
        }

        // 3. As a fallback for non-admin users, check the creator's password.

        // Find the current user to get their creator's ID
        if (!currentUserInfo.created_by_id) {
            return res.status(404).json({ success: false, message: 'Creator (Admin) not found for this user.' });
        }

        // Get the creator's (Hotel Admin's) details, specifically the password hash
        const creator = db.prepare("SELECT password, role_level FROM mst_users WHERE userid = ? AND role_level IN ('ADMIN', 'BRAND_ADMIN', 'SUPER_ADMIN')").get(currentUserInfo.created_by_id);

        if (!creator) {
            return res.status(404).json({ success: false, message: 'Creator user record not found or is not an authorized admin.' });
        }

        // Verify the provided password against the creator's hashed password
        const isValidPassword = await bcrypt.compare(password, creator.password);

        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Invalid user or admin password' });
        }

        // If password is valid
        res.json({ success: true, message: 'Admin password verified successfully' });

    } catch (error) {
        console.error('Creator password verification error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Refresh JWT token
exports.refreshToken = (req, res) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization header missing or malformed" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access token required" });
        }

        // Verify the current token
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }

            // Get user details to ensure they still exist and are active
            const user = db.prepare(`
                SELECT u.*
                FROM mst_users u
                WHERE u.userid = ? AND u.status = 1
            `).get(decoded.userid);

            if (!user) {
                return res.status(401).json({ message: 'User not found or inactive' });
            }

            // Generate new token with same payload
            const newToken = jwt.sign(
                {
                    userid: decoded.userid,
                    username: decoded.username,
                    role_level: decoded.role_level,
                    email: decoded.email,
                    companyid: decoded.companyid,
                    yearid: decoded.yearid,
                    company_name: decoded.company_name,
                    year_name: decoded.year_name
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Token refreshed successfully',
                token: newToken
            });
        });

    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create initial SuperAdmin (if not exists)
exports.createInitialSuperAdmin = async () => {
    try {
        // Check if SuperAdmin exists
        const existingSuperAdmin = db.prepare('SELECT userid FROM mst_users WHERE role_level = ?').get('SUPER_ADMIN');

        if (!existingSuperAdmin) {
            const hashedPassword = await bcrypt.hash('superadmin123', 10);

            const stmt = db.prepare(`
                INSERT INTO mst_users (
                    username, email, password, full_name, role_level,
                    status, created_date
                ) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
            `);

            const result = stmt.run(
                'superadmin',
                'superadmin@miracle.com',
                hashedPassword,
                'Super Administrator',
                'SUPER_ADMIN',
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
    }
};
