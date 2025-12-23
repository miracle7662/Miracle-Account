const db = require('../config/db')
// Helper → return all rows
const getAll = (query, params = []) => {
  // Using better-sqlite3 synchronous API
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(query)
      const rows = stmt.all(params)
      resolve(rows)
    } catch (err) {
      reject(err)
    }
  })
}

const runQuery = (query, params = []) => {
  // Using better-sqlite3 synchronous API
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(query)
      const info = stmt.run(params)
      resolve({ id: info.lastInsertRowid || info.lastInsertROWID || 0, changes: info.changes })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  // ------------------------------------
  // 1️⃣ GET CUSTOMER LIST (Debtors) - Only those with Souda entries on specified date
  // ------------------------------------
  getCustomers: async (req, res) => {
    try {
      console.log('getCustomers called with companyid:', req.companyid, 'yearid:', req.yearid);
      const companyid = req.companyid;
      const yearid = req.yearid;
      const date = req.query.date || 'now';

      // First check if tables exist and have data


      const stmt = db.prepare(`
        SELECT DISTINCT
          m.LedgerId,
          m.LedgerNo,
          m.CustomerNo,
          m.FarmerNo,
          m.Name,
          m.MarathiName,
          m.address,
          s.state_name AS state,
          c.city_name AS city,
          m.state_id,
          m.cityid,
          m.MobileNo,
          m.PhoneNo,
          m.GstNo,
          m.PanNo,
          m.OpeningBalance,
          m.OpeningBalanceDate,
          m.AccountTypeId,
          m.AccountType,
          m.Status,
          m.companyid,
          m.yearid
        FROM mandiledger m
        INNER JOIN soudaitemsdetails sid
          ON sid.CustomerNo = m.CustomerNo AND sid.companyid = m.companyid AND sid.yearid = m.yearid
        INNER JOIN soudaheader sh
          ON sh.SoudaID = sid.SoudaID AND sh.companyid = sid.companyid AND sh.yearid = sid.yearid
        LEFT JOIN mststatemaster s
          ON s.stateid = CAST(m.state_id AS INTEGER)
        LEFT JOIN mstcitymaster c
          ON c.cityid = CAST(m.cityid AS INTEGER) AND c.stateId = s.stateid
        WHERE m.AccountType = 'SUNDRY DEBTORS(Customer)' AND m.companyid = ? AND m.yearid = ? AND DATE(sh.SoudaDate) = DATE(?)
        ORDER BY m.Name DESC
      `);

      console.log('Executing query with params:', companyid, yearid, date);
      const rows = stmt.all(companyid, yearid, date);
      console.log('Query returned', rows.length, 'rows');
      res.json(rows)
    } catch (error) {
      console.error('Error in getCustomers:', error)
      res.status(500).json({ error: error.message, stack: error.stack })
    }
  },

  // ------------------------------------
  // 2️⃣ GET FARMER LIST (Creditors)
  // ------------------------------------
  getFarmers: async (req, res) => {
    try {
      const companyid = req.companyid;
      const yearid = req.yearid;

      const stmt = db.prepare(`
        SELECT
          m.LedgerId,
          m.LedgerNo,
          m.CustomerNo,
          m.FarmerNo,
          m.Name,
          m.MarathiName,
          m.address,
          s.state_name AS state,
          c.city_name AS city,
          m.state_id,
          m.cityid,
          m.MobileNo,
          m.PhoneNo,
          m.GstNo,
          m.PanNo,
          m.OpeningBalance,
          m.OpeningBalanceDate,
          m.AccountTypeId,
          m.AccountType,
          m.Status,
          m.companyid,
          m.yearid
        FROM mandiledger m
        LEFT JOIN mststatemaster s
          ON s.stateid = CAST(m.state_id AS INTEGER)
        LEFT JOIN mstcitymaster c
          ON c.cityid = CAST(m.cityid AS INTEGER) AND c.stateId = s.stateid
        WHERE m.AccountType ='SUNDRY CREDITORS(Supplier)' AND m.companyid = ? AND m.yearid = ?
        ORDER BY m.Name DESC
      `);

      const rows = stmt.all(companyid, yearid);
      res.json(rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // ------------------------------------
  // 3️⃣ GET LEDGER LIST (ALL)
  // ------------------------------------
  getLedger: async (req, res) => {
    try {
      const companyid = req.companyid;
      const yearid = req.yearid;

      const stmt = db.prepare(`
        SELECT
          m.LedgerId,
          m.LedgerNo,
          m.CustomerNo,
          m.FarmerNo,
          m.Name,
          m.MarathiName,
          m.address,
          s.state_name AS state,
          c.city_name AS city,
          m.state_id,
          m.cityid,
          m.MobileNo,
          m.PhoneNo,
          m.GstNo,
          m.PanNo,
          m.OpeningBalance,
          m.OpeningBalanceDate,
          m.AccountTypeId,
          m.AccountType,
          m.Status,
          m.companyid,
          m.yearid
        FROM mandiledger m
        LEFT JOIN mststatemaster s
          ON s.stateid = CAST(m.state_id AS INTEGER)
        LEFT JOIN mstcitymaster c
          ON c.cityid = CAST(m.cityid AS INTEGER) AND c.stateId = s.stateid
        WHERE m.AccountTypeId NOT IN (19, 20) AND m.companyid = ? AND m.yearid = ?
        ORDER BY m.Name DESC
      `);

      const rows = stmt.all(companyid, yearid);
      res.json(rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // ------------------------------------
  // ADD, UPDATE, DELETE — common for all
  // ------------------------------------

  createLedger: async (req, res) => {
    try {
      const data = req.body

      // Sanitize and convert fields before querying
      const LedgerNo = parseInt(data.LedgerNo)
      const sanitizedLedgerNo = isNaN(LedgerNo) ? null : LedgerNo

      // Determine AccountType string from AccountTypeId if not provided
      let accountTypeName = data.AccountType
      if ((!accountTypeName || accountTypeName.trim() === '') && data.AccountTypeId) {
        try {
          const row = await db
            .prepare('SELECT AccName FROM accounttypedetails WHERE AccID = ? AND companyid = ?')
            .get(data.AccountTypeId, req.companyid)
          if (row && row.AccName) {
            accountTypeName = row.AccName
          }
        } catch (err) {
          console.error('Failed to fetch account type name in createLedger:', err)
        }
      }

      let CustomerNo
      let FarmerNo

      // Auto-generate CustomerNo for SUNDRY DEBTORS(Customer), ignore provided value
      if (accountTypeName === 'SUNDRY DEBTORS(Customer)') {
        const row = await db
          .prepare('SELECT MAX(CustomerNo) as maxCustomerNo FROM mandiledger WHERE companyid = ? AND yearid = ?')
          .get(req.companyid, req.yearid)
        CustomerNo = row && row.maxCustomerNo ? row.maxCustomerNo + 1 : 1
        FarmerNo = null // Ensure FarmerNo is null for customers
      }
      // Auto-generate FarmerNo for SUNDRY CREDITORS(Supplier), ignore provided value
      else if (accountTypeName === 'SUNDRY CREDITORS(Supplier)') {
        const row = await db.prepare('SELECT MAX(FarmerNo) as maxFarmerNo FROM mandiledger WHERE companyid = ? AND yearid = ?').get(req.companyid, req.yearid)
        FarmerNo = row && row.maxFarmerNo ? row.maxFarmerNo + 1 : 1
        CustomerNo = null // Ensure CustomerNo is null for farmers
      }
      // For other account types, use provided values or set to null if not provided
      else {
        if (data.CustomerNo !== undefined && data.CustomerNo !== null && data.CustomerNo !== '') {
          const tempCustomerNo = parseInt(data.CustomerNo)
          CustomerNo = isNaN(tempCustomerNo) ? null : tempCustomerNo
        } else {
          CustomerNo = null
        }

        if (data.FarmerNo !== undefined && data.FarmerNo !== null && data.FarmerNo !== '') {
          const tempFarmerNo = parseInt(data.FarmerNo)
          FarmerNo = isNaN(tempFarmerNo) ? null : tempFarmerNo
        } else {
          FarmerNo = null
        }
      }

      const OpeningBalance = parseFloat(data.OpeningBalance)
      const sanitizedOpeningBalance = isNaN(OpeningBalance) ? 0 : OpeningBalance

      // Convert empty string to null for AccountTypeId and OpeningBalanceDate
      const sanitizedAccountTypeId =
        data.AccountTypeId === '' ? null : parseInt(data.AccountTypeId) || null
      const sanitizedOpeningBalanceDate =
        data.OpeningBalanceDate === '' ? null : data.OpeningBalanceDate

      const query = `
        INSERT INTO mandiledger
        (LedgerNo, CustomerNo, FarmerNo, Name, MarathiName, address, state_id, cityid, MobileNo, PhoneNo, GstNo, PanNo,
        OpeningBalance, OpeningBalanceDate, AccountTypeId, AccountType, Status, createdbyid, companyid, yearid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

      const params = [
        sanitizedLedgerNo,
        CustomerNo,
        FarmerNo,
        data.Name,
        data.MarathiName,
        data.address,
        data.state_id,
        data.cityid,
        data.MobileNo,
        data.PhoneNo,
        data.GstNo,
        data.PanNo,
        sanitizedOpeningBalance,
        sanitizedOpeningBalanceDate,
        sanitizedAccountTypeId,
        accountTypeName,
        1,
        data.createdbyid || req.userid || 1,
        req.companyid,
        req.yearid,
      ]

      const result = await runQuery(query, params)
      res.json({ success: true, id: result.id })
    } catch (err) {
      console.error('Error in createLedger:', err, 'Received data:', req.body)
      res.status(500).json({ error: err.message })
    }
  },

  updateLedger: async (req, res) => {
    try {
      const id = req.params.id
      const data = req.body

      // Sanitize and convert fields before querying
      const OpeningBalance = parseFloat(data.OpeningBalance)
      const sanitizedOpeningBalance = isNaN(OpeningBalance) ? 0 : OpeningBalance

      const sanitizedAccountTypeId = data.AccountTypeId === '' ? null : data.AccountTypeId
      const sanitizedOpeningBalanceDate =
        data.OpeningBalanceDate === '' ? null : data.OpeningBalanceDate

      // Check ownership
      const exists = await db.prepare(`
        SELECT LedgerId 
        FROM mandiledger
        WHERE LedgerId = ? AND companyid = ?
      `).get(id, req.companyid);

      if (!exists) {
        return res.status(404).json({ error: 'Ledger not found or access denied' });
      }

      const query = `
        UPDATE mandiledger SET
        LedgerNo = ?, CustomerNo = ?, FarmerNo = ?, Name = ?, MarathiName = ?, address = ?, state_id = ?, cityid = ?,
        MobileNo = ?, PhoneNo = ?, GstNo = ?, PanNo = ?, OpeningBalance = ?, OpeningBalanceDate = ?,
        AccountTypeId = ?, AccountType = ?, updatedbyid = ?, updatedbydate = CURRENT_TIMESTAMP, companyid = ?, yearid = ?
        WHERE LedgerId = ? AND companyid = ?
      `

      const params = [
        data.LedgerNo,
        data.CustomerNo,
        data.FarmerNo,
        data.Name,
        data.MarathiName,
        data.address,
        data.state_id,
        data.cityid,
        
        data.MobileNo,
        data.PhoneNo,
        data.GstNo,
        data.PanNo,
        sanitizedOpeningBalance,
        sanitizedOpeningBalanceDate,
        sanitizedAccountTypeId,
        data.AccountType,
        data.updatedbyid || req.userid || 1,
        req.companyid,
        req.yearid,
        id,
        req.companyid,
      ]

      const result = await runQuery(query, params)
      res.json({ success: true, changes: result.changes })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  deleteLedger: async (req, res) => {
    try {
      const id = req.params.id
      const companyid = req.companyid;

      // Validate record
      const exists = await db.prepare(`
        SELECT LedgerId 
        FROM mandiledger 
        WHERE LedgerId = ? AND companyid = ?
      `).get(id, companyid);

      if (!exists) {
        return res.status(404).json({ error: 'Ledger not found or access denied' });
      }

      await runQuery('DELETE FROM mandiledger WHERE LedgerId = ? AND companyid = ?', [id, companyid])
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // ------------------------------------
  // 4️⃣ TEST DB CONNECTION
  // ------------------------------------
  testDbConnection: async (req, res) => {
    try {
      // Simple query to test DB connection
      await getAll('SELECT 1')
      res.json({ success: true, message: 'Database connection is OK!' })
    } catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
  },

  getCashBankLedgers: async (req, res) => {
    try {
      const companyid = req.companyid;
      const yearid = req.yearid;

      const stmt = db.prepare(`
        SELECT LedgerId, Name 
        FROM mandiledger 
        WHERE AccountTypeId IN ('17', '18') AND companyid = ? AND yearid = ?
        ORDER BY  Name DESC
      `)

      const rows = stmt.all(companyid, yearid);
      res.json(rows)
    } catch (error) {
      console.error('Error in getCashBankLedgers:', error)
      res.status(500).json({ error: error.message })
    }
  },

  // ------------------------------------
  // GET Opposite Bank Ledger List with Label Formatting
  // ------------------------------------
  getOppBankList: async (req, res) => {
    try {
      const companyid = req.companyid;
      const yearid = req.yearid;

      const stmt = db.prepare(`
        SELECT LedgerId, LedgerNo, CustomerNo, FarmerNo, Name, AccountType
        FROM mandiledger
        WHERE companyid = ? AND yearid = ?
        ORDER BY Name ASC
      `)

      const rows = stmt.all(companyid, yearid);
      res.json(rows)
    } catch (error) {
      console.error('Error in getOppBankList:', error)
      res.status(500).json({ error: error.message })
    }
  },

  // ------------------------------------
  // GET CUSTOMER BY CUSTOMER NO
  // ------------------------------------
  getCustomerByNo: async (req, res) => {
    try {
      const customerNo = req.params.customerNo
      const companyid = req.companyid;
      const yearid = req.yearid;

      const stmt = db.prepare(`
        SELECT
          m.LedgerId,
          m.LedgerNo,
          m.CustomerNo,
          m.FarmerNo,
          m.Name,
          m.MarathiName,
          m.address,
          s.state_name AS state,
          c.city_name AS city,
          m.state_id,
          m.cityid,
          m.MobileNo,
          m.PhoneNo,
          m.GstNo,
          m.PanNo,
          m.OpeningBalance,
          m.OpeningBalanceDate,
          m.AccountTypeId,
          m.AccountType,
          m.Status,
          m.companyid,
          m.yearid
        FROM mandiledger m
        INNER JOIN mststatemaster s
          ON s.stateid = CAST(m.state_id AS INTEGER)
        INNER JOIN mstcitymaster c
          ON c.cityid = CAST(m.cityid AS INTEGER)
        WHERE m.CustomerNo = ? AND m.AccountType = 'SUNDRY DEBTORS(Customer)' AND m.companyid = ? AND m.yearid = ?
      `);

      const rows = stmt.all(customerNo, companyid, yearid);
      if (rows.length > 0) {
        res.json(rows[0])
      } else {
        res.status(404).json({ error: 'Customer not found' })
      }
    } catch (error) {
      console.error('Error in getCustomerByNo:', error)
      res.status(500).json({ error: error.message })
    }
  },

  // ------------------------------------
  // GET FARMER BY FARMER NO
  // ------------------------------------
  getFarmerByNo: async (req, res) => {
    try {
      const farmerNo = req.params.farmerNo
      const companyid = req.companyid;
      const yearid = req.yearid;

      const stmt = db.prepare(`
        SELECT
          m.LedgerId,
          m.LedgerNo,
          m.CustomerNo,
          m.FarmerNo,
          m.Name,
          m.MarathiName,
          m.address,
          s.state_name AS state,
          c.city_name AS city,
          m.state_id,
          m.cityid,
          m.MobileNo,
          m.PhoneNo,
          m.GstNo,
          m.PanNo,
          m.OpeningBalance,
          m.OpeningBalanceDate,
          m.AccountTypeId,
          m.AccountType,
          m.Status,
          m.companyid,
          m.yearid
        FROM mandiledger m
        INNER JOIN mststatemaster s
          ON s.stateid = CAST(m.state_id AS INTEGER)
        INNER JOIN mstcitymaster c
          ON c.cityid = CAST(m.cityid AS INTEGER)
        WHERE m.FarmerNo = ? AND m.AccountType = 'SUNDRY CREDITORS(Supplier)' AND m.companyid = ? AND m.yearid = ?
      `);

      const rows = stmt.all(farmerNo, companyid, yearid);
      if (rows.length > 0) {
        res.json(rows[0])
      } else {
        res.status(404).json({ error: 'Farmer not found' })
      }
    } catch (error) {
      console.error('Error in getFarmerByNo:', error)
      res.status(500).json({ error: error.message })
    }
  },

  getsodacustomer: async (req, res) => {
  try {
    const companyid = req.companyid;
    const yearid = req.yearid;

    const stmt = db.prepare(`
      SELECT
        m.LedgerId,
        m.LedgerNo,
        m.CustomerNo,
        m.FarmerNo,
        m.Name,
        m.MarathiName,
        m.address,
        s.state_name AS state,
        c.city_name AS city,
        m.state_id,
        m.cityid,
        m.MobileNo,
        m.PhoneNo,
        m.GstNo,
        m.PanNo,
        m.OpeningBalance,
        m.OpeningBalanceDate,
        m.AccountTypeId,
        m.AccountType,
        m.Status,
        m.companyid,
        m.yearid
      FROM mandiledger m
      LEFT JOIN mststatemaster s
        ON s.stateid = CAST(m.state_id AS INTEGER)
      LEFT JOIN mstcitymaster c
        ON c.cityid = CAST(m.cityid AS INTEGER) AND c.stateId = s.stateid
      WHERE m.AccountType = 'SUNDRY DEBTORS(Customer)'
        AND m.companyid = ?
        AND m.yearid = ?
      ORDER BY m.Name DESC
    `);

    const rows = stmt.all(companyid, yearid);
    res.json(rows);
  } catch (error) {
    console.error('Error in getsodacustomer:', error);
    res.status(500).json({ error: error.message });
  }
},


  // ------------------------------------
  // GET OUTSTANDING CUSTOMERS AND FARMERS
  // ------------------------------------
  getOutstandingCustomersAndFarmers: async (req, res) => {
    try {
      const companyid = req.companyid;
      const yearid = req.yearid;
      const cutoffDate = req.query.cutoffDate || '2025-12-12';

      const stmt = db.prepare(`
SELECT
    m.LedgerId,
    m.CustomerNo,
    m.FarmerNo,
    m.Name,
    m.AccountType,
    (
        CASE
            WHEN m.AccountType = 'SUNDRY DEBTORS(Customer)' THEN
                COALESCE(m.OpeningBalance, 0)
                + COALESCE(
                    (SELECT SUM(cb.FinalBillAmount)
                     FROM customerbillheader cb
                     WHERE cb.CustomerID = m.CustomerNo
                       AND cb.companyid = ?
                       AND cb.yearid = ?
                       AND DATE(cb.custBillDate) <= DATE(?)
                    ), 0
                )
                + COALESCE(
                    (SELECT SUM(c.Amount)
                     FROM CashBook c
                     WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                       AND c.TransactionType = 'Payment'
                       AND c.companyid = ?
                       AND c.yearid = ?
                       AND DATE(c.TransactionDate) <= DATE(?)
                    ), 0
                )
                - COALESCE(
                    (SELECT SUM(c.Amount)
                     FROM CashBook c
                     WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                       AND c.TransactionType = 'Receipt'
                       AND c.companyid = ?
                       AND c.yearid = ?
                       AND DATE(c.TransactionDate) <= DATE(?)
                    ), 0
                )

            WHEN m.AccountType = 'SUNDRY CREDITORS(Supplier)' THEN
                COALESCE(m.OpeningBalance, 0)
                + COALESCE(
                    (SELECT SUM(fb.FinalBillAmount)
                     FROM FarmerBill fb
                     WHERE fb.FarmerID = m.FarmerNo
                       AND fb.companyid = ?
                       AND fb.yearid = ?
                       AND DATE(fb.farBillDate) <= DATE(?)
                    ), 0
                )
                + COALESCE(
                    (SELECT SUM(c.Amount)
                     FROM CashBook c
                     WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                       AND c.TransactionType = 'Receipt'
                       AND c.companyid = ?
                       AND c.yearid = ?
                       AND DATE(c.TransactionDate) <= DATE(?)
                    ), 0
                )
                - COALESCE(
                    (SELECT SUM(c.Amount)
                     FROM CashBook c
                     WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                       AND c.TransactionType = 'Payment'
                       AND c.companyid = ?
                       AND c.yearid = ?
                       AND DATE(c.TransactionDate) <= DATE(?)
                    ), 0
                )

            ELSE 0
        END
    ) AS Balance,
    COALESCE(
        (SELECT MAX(fb.farBillDate)
         FROM FarmerBill fb
         WHERE fb.FarmerID = m.FarmerNo
           AND fb.companyid = ?
           AND fb.yearid = ?
        ),
        (SELECT MAX(cb.custBillDate)
         FROM customerbillheader cb
         WHERE cb.CustomerID = m.CustomerNo
           AND cb.companyid = ?
           AND cb.yearid = ?
        )
    ) AS LastBillDate,

    COALESCE(
        JULIANDAY(?) - JULIANDAY(
            COALESCE(
                (SELECT MAX(fb.farBillDate)
                 FROM FarmerBill fb
                 WHERE fb.FarmerID = m.FarmerNo
                   AND fb.companyid = ?
                   AND fb.yearid = ?
                ),
                (SELECT MAX(cb.custBillDate)
                 FROM customerbillheader cb
                 WHERE cb.CustomerID = m.CustomerNo
                   AND cb.companyid = ?
                   AND cb.yearid = ?
                )
            )
        ),
        0
    ) AS LastBillDaysCount

FROM mandiledger m
WHERE m.companyid = ?
  AND m.yearid = ?
  AND (
        CASE
            WHEN m.AccountType = 'SUNDRY DEBTORS(Customer)' THEN
                COALESCE(m.OpeningBalance, 0)
                + COALESCE(
                    (SELECT SUM(cb.FinalBillAmount)
                     FROM customerbillheader cb
                     WHERE cb.CustomerID = m.CustomerNo
                       AND cb.companyid = ?
                       AND cb.yearid = ?
                       AND DATE(cb.custBillDate) <= DATE(?)
                    ), 0
                )
                + COALESCE(
                    (SELECT SUM(c.Amount)
                     FROM CashBook c
                     WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                       AND c.TransactionType = 'Payment'
                       AND c.companyid = ?
                       AND c.yearid = ?
                       AND DATE(c.TransactionDate) <= DATE(?)
                    ), 0
                )
                - COALESCE(
                    (SELECT SUM(c.Amount)
                     FROM CashBook c
                     WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                       AND c.TransactionType = 'Receipt'
                       AND c.companyid = ?
                       AND c.yearid = ?
                       AND DATE(c.TransactionDate) <= DATE(?)
                    ), 0
                )

            WHEN m.AccountType = 'SUNDRY CREDITORS(Supplier)' THEN
                COALESCE(m.OpeningBalance, 0)
                + COALESCE(
                    (SELECT SUM(fb.FinalBillAmount)
                     FROM FarmerBill fb
                     WHERE fb.FarmerID = m.FarmerNo
                       AND fb.companyid = ?
                       AND fb.yearid = ?
                       AND DATE(fb.farBillDate) <= DATE(?)
                    ), 0
                )
                + COALESCE(
                    (SELECT SUM(c.Amount)
                     FROM CashBook c
                     WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                       AND c.TransactionType = 'Receipt'
                       AND c.companyid = ?
                       AND c.yearid = ?
                       AND DATE(c.TransactionDate) <= DATE(?)
                    ), 0
                )
                - COALESCE(
                    (SELECT SUM(c.Amount)
                     FROM CashBook c
                     WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                       AND c.TransactionType = 'Payment'
                       AND c.companyid = ?
                       AND c.yearid = ?
                       AND DATE(c.TransactionDate) <= DATE(?)
                    ), 0
                )
            ELSE 0
        END
  ) != 0
ORDER BY m.Name DESC


      `);

      const params = [
        // Balance column subqueries
        companyid, yearid, cutoffDate, // CustomerBill debtors
        companyid, yearid, cutoffDate, // CashBook Payment debtors
        companyid, yearid, cutoffDate, // CashBook Receipt debtors
        companyid, yearid, cutoffDate, // FarmerBill creditors
        companyid, yearid, cutoffDate, // CashBook Receipt creditors
        companyid, yearid, cutoffDate, // CashBook Payment creditors
        // LastBillDate subqueries
        companyid, yearid, // FarmerBill
        companyid, yearid, // customerbillheader
        // LastBillDaysCount
        cutoffDate, // JULIANDAY(?)
        companyid, yearid, // FarmerBill
        companyid, yearid, // customerbillheader
        // WHERE clause
        companyid, yearid, // m.companyid, m.yearid
        companyid, yearid, cutoffDate, // Balance subquery 1 debtors customerbill
        companyid, yearid, cutoffDate, // Balance subquery 2 debtors cashbook payment
        companyid, yearid, cutoffDate, // Balance subquery 3 debtors cashbook receipt
        companyid, yearid, cutoffDate, // Balance subquery 4 creditors farmerbill
        companyid, yearid, cutoffDate, // Balance subquery 5 creditors cashbook receipt
        companyid, yearid, cutoffDate, // Balance subquery 6 creditors cashbook payment
      ];

      const rows = stmt.all(...params);
      res.json(rows);
    } catch (error) {
      console.error('Error in getOutstandingCustomersAndFarmers:', error);
      res.status(500).json({ error: error.message });
    }
  },

  
}