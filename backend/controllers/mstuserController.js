// controllers/mstuserController.js

const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Middleware: Verify JWT Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

// Optional: Only allow admins
const requireAdmin = (req, res, next) => {
  if (!["superadmin", "admin"].includes(req.user.role_level)) {
    return res.status(403).json({ error: "Access denied. Admin rights required." });
  }
  next();
};

// =============================
// GET ALL USERS (with filtering)
// =============================
exports.getUsers = [
  verifyToken,
  (req, res) => {
    const { companyid, yearid } = req.query;
    const currentUser = req.user;

    let query = `
      SELECT userid, username, email, full_name, phone, role_level,
             companyid, Designation, status, created_date
      FROM mst_users
      WHERE 1=1
    `;
    const params = [];

    // Data isolation for admin
    if (currentUser.role_level === "admin") {
      query += ` AND companyid = ? AND yearid = ?`;
      params.push(currentUser.companyid, currentUser.yearid);
    } else {
      if (companyid) {
        query += ` AND companyid = ?`;
        params.push(companyid);
      }
      if (yearid) {
        query += ` AND yearid = ?`;
        params.push(yearid);
      }
    }

    query += ` ORDER BY userid DESC`;

    try {
      const users = db.prepare(query).all(...params);
      res.json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },
];

// =============================
// CREATE USER
// =============================
exports.createUser = [
  verifyToken,
  async (req, res) => {
    const {
      username,
      email,
      password,
      full_name,
      phone,
      role_level,
      companyid,
      yearid,
      Designation,
      status = "1",
    } = req.body;

    if (!username || !email || !password || !full_name || !companyid || !yearid) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const sql = `
        INSERT INTO mst_users (
          username, email, password, full_name, phone, role_level,
          companyid, yearid, Designation, status,
          created_by_id, created_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `;

      const params = [
        username,
        email,
        hashedPassword,
        full_name,
        phone || null,
        role_level || "user",
        companyid,
        yearid,
        Designation || null,
        status,
        req.user.userid,
      ];

      const result = db.prepare(sql).run(params);

      res.status(201).json({
        message: "User created successfully",
        userid: result.lastInsertRowid,
      });
    } catch (err) {
      console.error("Create user error:", err);

      if (err.message.includes("UNIQUE constraint failed: mst_users.username")) {
        return res.status(400).json({ error: "Username already exists" });
      }
      if (err.message.includes("UNIQUE constraint failed: mst_users.email")) {
        return res.status(400).json({ error: "Email already in use" });
      }

      res.status(500).json({ error: "Failed to create user" });
    }
  },
];

// =============================
// UPDATE USER
// =============================
exports.updateUser = [
  verifyToken,
  requireAdmin,
  async (req, res) => {
    const { id } = req.params;
    const updates = [];
    const params = [];

    const fields = {
      username: req.body.username,
      email: req.body.email,
      full_name: req.body.full_name,
      phone: req.body.phone,
      role_level: req.body.role_level,
      companyid: req.body.companyid,
      yearid: req.body.yearid,
      Designation: req.body.Designation,
      status: req.body.status,
    };

    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        params.push(value);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    updates.push("updated_by_id = ?");
    params.push(req.user.userid);
    updates.push("updated_date = datetime('now')");

    const sql = `UPDATE mst_users SET ${updates.join(", ")} WHERE userid = ?`;
    params.push(id);

    try {
      const result = db.prepare(sql).run(params);
      if (result.changes === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User updated successfully" });
    } catch (err) {
      console.error("Update user error:", err);
      res.status(500).json({ error: "Failed to update user" });
    }
  },
];

// =============================
// DELETE USER
// =============================
exports.deleteUser = [
  verifyToken,
  requireAdmin,
  (req, res) => {
    const { id } = req.params;

    if (id === req.user.userid) {
      return res.status(400).json({ error: "You cannot delete your own account" });
    }

    try {
      const result = db.prepare("DELETE FROM mst_users WHERE userid = ?").run(id);
      if (result.changes === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      console.error("Delete user error:", err);
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
];

// =============================
// GET SINGLE USER (optional)
// =============================
exports.getUserById = [
  verifyToken,
  (req, res) => {
    const { id } = req.params;
    try {
      const user = db
        .prepare(`
          SELECT userid, username, email, full_name, phone, role_level,
                 companyid, Designation, status
          FROM mst_users
          WHERE userid = ?
        `)
        .get(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  },
];