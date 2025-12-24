const db = require("../config/db");

// -------------------------------
// CREATE CashBook Entry
// -------------------------------
exports.createCashBook = (req, res) => {
    try {
        const body = req.body;

        // Basic validation
        if (!body.TransactionDate || !body.TransactionType || !body.PaymentMode || !body.Amount) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        // Insert into CashBook
        const stmt = db.prepare(`
            INSERT INTO CashBook
            (TransactionDate, VoucherNumber, TransactionType, PaymentMode, CashBankID, CashBankIDName, OppBankID, OppBankIDName, Amount,  Description, Created_by_id, companyid, yearid)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?)
        `);

        const result = stmt.run(
            body.TransactionDate,
            body.VoucherNumber || null,
            body.TransactionType,
            body.PaymentMode,
            body.CashBankID || null,
            body.CashBankIDName || null,
            body.OppBankID || null,
            body.OppBankIDName || null,
            body.Amount,
            body.Description || null,
            body.Created_by_id || 1,
            body.companyid,
            body.yearid
        );

        res.json({ message: "CashBook entry created successfully", CashBookID: result.lastInsertRowid });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal error", error: error.message });
    }
};

// -------------------------------
// GET ALL CashBook Entries
// -------------------------------
exports.getAllCashBook = (req, res) => {
  try {
    const companyid = req.companyid;
    const yearid = req.yearid;

    const stmt = db.prepare(`
      SELECT * 
      FROM CashBook 
      WHERE companyid = ? AND yearid = ? AND StatusCode = 1
    `);

    const rows = stmt.all(companyid, yearid);
    res.json(rows);

  } catch (error) {
    console.error('Error fetching cash book entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// -------------------------------
// GET CashBook Entry by ID
// -------------------------------
exports.getCashBookById = (req, res) => {
  try {
    const { id } = req.params;
    const companyid = req.companyid;
    const yearid = req.yearid;

    const stmt = db.prepare(`
      SELECT * FROM CashBook WHERE CashBookID = ? AND companyid = ? AND yearid = ?
    `);

    const row = stmt.get(id, companyid, yearid);

    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'CashBook entry not found' });
    }

  } catch (error) {
    console.error('Error fetching cash book entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// -------------------------------
// UPDATE CashBook Entry
// -------------------------------
exports.updateCashBook = (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Basic validation
    if (!body.TransactionDate || !body.TransactionType || !body.PaymentMode || !body.Amount) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const companyid = req.companyid;
    const yearid = req.yearid;

    // Check ownership
    const exists = db.prepare(`
      SELECT CashBookID 
      FROM CashBook
      WHERE CashBookID = ? AND companyid = ?
    `).get(id, companyid);

    if (!exists) {
      return res.status(404).json({ error: 'CashBook entry not found or access denied' });
    }

    // Update CashBook
    const stmt = db.prepare(`
      UPDATE CashBook SET
          TransactionDate = ?, VoucherNumber = ?, TransactionType = ?, PaymentMode = ?,
          CashBankID = ?, CashBankIDName = ?, OppBankID = ?, OppBankIDName = ?, Amount = ?,
          Description = ?, Updated_date = CURRENT_TIMESTAMP, Updated_id = ?, companyid = ?, yearid = ?
      WHERE CashBookID = ? AND companyid = ?
    `);

    const result = stmt.run(
        body.TransactionDate,
        body.VoucherNumber || null,
        body.TransactionType,
        body.PaymentMode,
        body.CashBankID || null,
        body.CashBankIDName || null,
        body.OppBankID || null,
        body.OppBankIDName || null,
        body.Amount,
        body.Description || null,
        body.Updated_id || 1,
        companyid,
        yearid,
        id,
        companyid
    );

    if (result.changes === 0) {
      res.status(404).json({ error: 'CashBook entry not found' });
    } else {
      res.json({ message: "CashBook entry updated successfully" });
    }

  } catch (error) {
    console.error('Error updating cash book entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// -------------------------------
// GET MAX Voucher Number
// -------------------------------
exports.getMaxVoucherNumber = (req, res) => {
  try {
    const companyid = req.companyid;
    const yearid = req.yearid;

    const stmt = db.prepare(`
      SELECT COALESCE(MAX(CAST(VoucherNumber AS INTEGER)), 0) as maxVoucherNumber 
      FROM CashBook 
      WHERE companyid = ? AND yearid = ?
    `);

    const row = stmt.get(companyid, yearid);

    const maxVoucherNumber = row.maxVoucherNumber;
    res.json({ maxVoucherNumber: maxVoucherNumber });

  } catch (error) {
    console.error('Error fetching max voucher number:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// -------------------------------
// DELETE CashBook Entry
// -------------------------------
exports.deleteCashBook = (req, res) => {
  try {
    const { id } = req.params;
    const companyid = req.companyid;

    // Validate record
    const exists = db.prepare(`
      SELECT CashBookID 
      FROM CashBook 
      WHERE CashBookID = ? AND companyid = ?
    `).get(id, companyid);

    if (!exists) {
      return res.status(404).json({ error: 'CashBook entry not found or access denied' });
    }

    db.prepare(`
      DELETE FROM CashBook 
      WHERE CashBookID = ? AND companyid = ?
    `).run(id, companyid);

    res.json({ message: "CashBook entry deleted successfully" });

  } catch (error) {
    console.error('Error deleting cash book entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};