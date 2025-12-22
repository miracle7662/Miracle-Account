const db = require('../config/db');

// ================= LIST =================
exports.listAccountNatures = (req, res) => {
  try {
    const companyid = req.companyid;
    const yearid = req.yearid;

    const stmt = db.prepare(`
      SELECT * 
      FROM accountnaturemaster 
      WHERE companyid = ? AND yearid = ?
    `);

    const accountnatures = stmt.all(companyid, yearid);
    res.json(accountnatures);

  } catch (error) {
    console.error('Error fetching account natures:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ================= GET BY ID =================
exports.getAccountNatureById = (req, res) => {
  try {
    const { id } = req.params;
    const companyid = req.companyid;
    const yearid = req.yearid;

    const stmt = db.prepare(`
      SELECT *
      FROM accountnaturemaster
      WHERE nature_id = ? AND companyid = ? AND yearid = ?
    `);

    const accountnature = stmt.get(id, companyid, yearid);

    if (accountnature) {
      res.json(accountnature);
    } else {
      res.status(404).json({ error: 'Account Nature not found' });
    }

  } catch (error) {
    console.error('Error fetching account nature:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ================= CREATE =================
exports.createAccountNature = (req, res) => {
  try {
    const { accountnature, status, created_by_id, created_date, companyid, yearid } = req.body;

    const stmt = db.prepare(`
      INSERT INTO accountnaturemaster 
      (accountnature, status, created_by_id, created_date, companyid, yearid)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      accountnature,
      status,
      created_by_id,
      created_date,
      companyid,
      yearid
    );

    res.status(201).json({
      message: 'Account Nature created successfully',
      insertedId: result.lastInsertRowid
    });

  } catch (error) {
    console.error('Error creating account nature:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ================= UPDATE =================
exports.updateAccountNature = (req, res) => {
  try {
    const { id } = req.params;
    const { accountnature, status, updated_by_id, updated_date, companyid, yearid } = req.body;

    // Check ownership
    const exists = db.prepare(`
      SELECT nature_id 
      FROM accountnaturemaster
      WHERE nature_id = ? AND companyid = ?
    `).get(id, companyid);

    if (!exists) {
      return res.status(404).json({ error: 'Account Nature not found or access denied' });
    }

    const stmt = db.prepare(`
      UPDATE accountnaturemaster
      SET accountnature = ?, status = ?, updated_by_id = ?, updated_date = ?, companyid = ?, yearid = ?
      WHERE nature_id = ? AND companyid = ?
    `);

    stmt.run(
      accountnature,
      status,
      updated_by_id,
      updated_date,
      companyid,
      yearid,
      id,
      companyid
    );

    res.json({ message: 'Account Nature updated successfully' });

  } catch (error) {
    console.error('Error updating account nature:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ================= DELETE =================
exports.deleteAccountNature = (req, res) => {
  try {
    const { id } = req.params;
    const companyid = req.companyid;

    // Validate record
    const exists = db.prepare(`
      SELECT nature_id 
      FROM accountnaturemaster 
      WHERE nature_id = ? AND companyid = ?
    `).get(id, companyid);

    if (!exists) {
      return res.status(404).json({ error: 'Account Nature not found or access denied' });
    }

    db.prepare(`
      DELETE FROM accountnaturemaster 
      WHERE nature_id = ? AND companyid = ?
    `).run(id, companyid);

    res.json({ message: 'Account Nature deleted successfully' });

  } catch (error) {
    console.error('Error deleting account nature:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};