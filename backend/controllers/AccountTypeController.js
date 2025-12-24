const db = require('../config/db');

// ================= LIST =================
exports.listAccountTypes = (req, res) => {
  try {
    const companyid = req.companyid;
    const yearid = req.yearid;

    const stmt = db.prepare(`
      SELECT * 
      FROM accounttypedetails 
      WHERE companyid = ? AND yearid = ?
    `);

    const accountTypes = stmt.all(companyid, yearid);
    res.json(accountTypes);

  } catch (error) {
    console.error('Error fetching account types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ================= GET BY ID =================
exports.getAccountTypeById = (req, res) => {
  try {
    const { id } = req.params;
    const companyid = req.companyid;
    const yearid = req.yearid;

    const stmt = db.prepare(`
      SELECT *
      FROM accounttypedetails
      WHERE AccID = ? AND companyid = ? AND yearid = ?
    `);

    const accountType = stmt.get(id, companyid, yearid);

    if (accountType) {
      res.json(accountType);
    } else {
      res.status(404).json({ error: 'Account Type not found' });
    }

  } catch (error) {
    console.error('Error fetching account type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ================= CREATE =================
exports.createAccountType = (req, res) => {
  try {
    const {
      AccName,
      UnderID,
      NatureOfC,
      status,
      created_by_id,
      created_date,
      updated_by_id,
      updated_date,
      companyid,
      yearid
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO accounttypedetails 
      (AccName, UnderID, NatureOfC, status, created_by_id, created_date, updated_by_id, updated_date, companyid, yearid)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      AccName,
      UnderID,
      NatureOfC,
      status,
      created_by_id,
      created_date,
      updated_by_id,
      updated_date,
      companyid,
      yearid
    );

    res.status(201).json({
      message: 'Account Type created successfully',
      insertedId: result.lastInsertRowid
    });

  } catch (error) {
    console.error('Error creating account type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ================= UPDATE =================
exports.updateAccountType = (req, res) => {
  try {
    const { id } = req.params;
    const {
      AccName,
      UnderID,
      NatureOfC,
      status,
      updated_by_id,
      updated_date,
      companyid,
      yearid
    } = req.body;

    // Check ownership
    const exists = db.prepare(`
      SELECT AccID 
      FROM accounttypedetails
      WHERE AccID = ? AND companyid = ?
    `).get(id, companyid);

    if (!exists) {
      return res.status(404).json({ error: 'Account Type not found or access denied' });
    }

    const stmt = db.prepare(`
      UPDATE accounttypedetails
      SET AccName = ?, UnderID = ?, NatureOfC = ?, status = ?, updated_by_id = ?, updated_date = ?, companyid = ?, yearid = ?
      WHERE AccID = ? AND companyid = ?
    `);

    stmt.run(
      AccName,
      UnderID,
      NatureOfC,
      status,
      updated_by_id,
      updated_date,
      companyid,
      yearid,
      id,
      companyid
    );

    res.json({ message: 'Account Type updated successfully' });

  } catch (error) {
    console.error('Error updating account type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ================= DELETE =================
exports.deleteAccountType = (req, res) => {
  try {
    const { id } = req.params;
    const companyid = req.companyid;

    // Validate record
    const exists = db.prepare(`
      SELECT AccID 
      FROM accounttypedetails 
      WHERE AccID = ? AND companyid = ?
    `).get(id, companyid);

    if (!exists) {
      return res.status(404).json({ error: 'Account Type not found or access denied' });
    }

    db.prepare(`
      DELETE FROM accounttypedetails 
      WHERE AccID = ? AND companyid = ?
    `).run(id, companyid);

    res.json({ message: 'Account Type deleted successfully' });

  } catch (error) {
    console.error('Error deleting account type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};