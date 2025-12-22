const db = require('../config/db');

// Helper → return all rows
const getAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(query);
      const rows = stmt.all(params);
      resolve(rows);
    } catch (err) {
      reject(err);
    }
  });
};

const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(query);
      const info = stmt.run(params);
      resolve({ id: info.lastInsertRowid || info.lastInsertROWID || 0, changes: info.changes });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  // Get ledger accounts with balances
  getLedgerAccounts: async (req, res) => {
    try {
      const { type } = req.params; // 'customer', 'farmer', 'all'
      const companyid = req.companyid;
      const yearid = req.yearid;

      let query = `
        SELECT
          m.LedgerId,
          m.LedgerNo,
          m.CustomerNo,
          m.FarmerNo,
          m.Name,
          m.OpeningBalance,
          m.OpeningBalanceDate,
          m.AccountType,
          m.companyid,
          m.yearid,
          COALESCE(m.OpeningBalance, 0) as balance,
          c.Name as CustomerName
        FROM mandiledger m
        LEFT JOIN mandiledger c ON m.CustomerNo = c.CustomerNo AND c.AccountType = 'SUNDRY DEBTORS(Customer)'
        WHERE m.companyid = ? AND m.yearid = ?
      `;

      const params = [companyid, yearid];

      if (type === 'customer') {
        query += ` AND m.AccountType = 'SUNDRY DEBTORS(Customer)'`;
      } else if (type === 'farmer') {
        query += ` AND m.AccountType = 'SUNDRY CREDITORS(Supplier)'`;
      } else if (type === 'all') {
        query += ` AND m.AccountTypeId NOT IN (19, 20)`;
      }

      query += ` ORDER BY m.Name ASC`;

      const ledgers = await getAll(query, params);

      // Calculate current balances by aggregating transactions
      for (let ledger of ledgers) {
        const transactions = await getAll(`
          SELECT
            SUM(CASE WHEN TransactionType = 'debit' THEN Amount ELSE 0 END) as totalDebit,
            SUM(CASE WHEN TransactionType = 'credit' THEN Amount ELSE 0 END) as totalCredit
          FROM ledger_transactions
          WHERE LedgerId = ? AND companyid = ? AND yearid = ?
        `, [ledger.LedgerId, companyid, yearid]);

        const totalDebit = transactions[0]?.totalDebit || 0;
        const totalCredit = transactions[0]?.totalCredit || 0;
        ledger.currentBalance = parseFloat(ledger.balance) + totalDebit - totalCredit;
      }

      res.json(ledgers);
    } catch (error) {
      console.error('Error in getLedgerAccounts:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get cashbook entries
  getCashBook: async (req, res) => {
    try {
      const { ledgerId } = req.params;
      const { fromDate, toDate } = req.query;
      const companyid = req.companyid;
      const yearid = req.yearid;

      let query = `
        SELECT
          cb.*,
          m.Name as LedgerName
        FROM CashBook cb
        LEFT JOIN mandiledger m ON cb.OppBankID = m.LedgerId
        WHERE cb.OppBankID = ? AND cb.companyid = ? AND cb.yearid = ?
      `;

      const params = [ledgerId, companyid, yearid];

      if (fromDate && toDate) {
        query += ` AND cb.TransactionDate BETWEEN ? AND ?`;
        params.push(fromDate, toDate);
      }

      query += ` ORDER BY cb.TransactionDate DESC, cb.Created_Date DESC`;

      const cashbookEntries = await getAll(query, params);
      res.json(cashbookEntries);
    } catch (error) {
      console.error('Error in getCashBook:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get receipt & payment entries
  getReceiptsPayments: async (req, res) => {
    try {
      const { ledgerId } = req.params;
      const { fromDate, toDate } = req.query;
      const companyid = req.companyid;
      const yearid = req.yearid;

      let query = `
        SELECT
          rp.*,
          m.Name as LedgerName,
          CASE
            WHEN rp.Type = 'receipt' THEN 'Receipt'
            WHEN rp.Type = 'payment' THEN 'Payment'
            ELSE rp.Type
          END as TransactionType
        FROM receipts_payments rp
        LEFT JOIN mandiledger m ON rp.LedgerId = m.LedgerId
        WHERE rp.LedgerId = ? AND rp.companyid = ? AND rp.yearid = ?
      `;

      const params = [ledgerId, companyid, yearid];

      if (fromDate && toDate) {
        query += ` AND rp.Date BETWEEN ? AND ?`;
        params.push(fromDate, toDate);
      }

      query += ` ORDER BY rp.Date DESC, rp.CreatedAt DESC`;

      const entries = await getAll(query, params);
      res.json(entries);
    } catch (error) {
      console.error('Error in getReceiptsPayments:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get customer bills for a ledger
  getCustomerBills: async (req, res) => {
    try {
      const { ledgerId } = req.params;
      const companyid = req.companyid;
      const yearid = req.yearid;

      const bills = await getAll(`
        SELECT
          cb.*,
          m.Name as CustomerName
        FROM customerbillheader cb
        LEFT JOIN mandiledger m ON cb.CustomerID = m.CustomerNo
        WHERE m.LedgerId = ? AND cb.companyid = ? AND cb.yearid = ?
        ORDER BY cb.custBillDate DESC
      `, [ledgerId, companyid, yearid]);

      res.json(bills);
    } catch (error) {
      console.error('Error in getCustomerBills:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get farmer bills for a ledger
 getFarmerBills: async (req, res) => {
  try {
    const { ledgerId } = req.params;
    const companyid = req.companyid;
    const yearid = req.yearid;

    const bills = await getAll(`
      SELECT
        fb.*,
        m.Name as FarmerName
      FROM FarmerBill fb
      LEFT JOIN mandiledger m ON fb.FarmerID = m.FarmerNo
      WHERE m.LedgerId = ? AND fb.companyid = ? AND fb.yearid = ?
      ORDER BY fb.farBillDate DESC
    `, [ledgerId, companyid, yearid]);

    res.json(bills);
  } catch (error) {
    console.error('Error in getFarmerBills:', error);
    res.status(500).json({ error: error.message });
  }
},


  // Get all debit/credit entries for a ledger
  getDebitCreditEntries: async (req, res) => {
    try {
      const { ledgerId } = req.params;
      const { fromDate, toDate } = req.query;
      const companyid = req.companyid;
      const yearid = req.yearid;

      let query = `
        SELECT
          lt.*,
          m.Name as LedgerName,
          CASE
            WHEN lt.TransactionType = 'debit' THEN lt.Amount
            ELSE 0
          END as Debit,
          CASE
            WHEN lt.TransactionType = 'credit' THEN lt.Amount
            ELSE 0
          END as Credit
        FROM ledger_transactions lt
        LEFT JOIN mandiledger m ON lt.LedgerId = m.LedgerId
        WHERE lt.LedgerId = ? AND lt.companyid = ? AND lt.yearid = ?
      `;

      const params = [ledgerId, companyid, yearid];

      if (fromDate && toDate) {
        query += ` AND lt.Date BETWEEN ? AND ?`;
        params.push(fromDate, toDate);
      }

      query += ` ORDER BY lt.Date DESC, lt.CreatedAt DESC`;

      const entries = await getAll(query, params);
      res.json(entries);
    } catch (error) {
      console.error('Error in getDebitCreditEntries:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get opening balance for a ledger
  getOpeningBalance: async (req, res) => {
    try {
      const { ledgerId } = req.params;
      const companyid = req.companyid;
      const yearid = req.yearid;

      const result = await getAll(`
        SELECT OpeningBalance, OpeningBalanceDate
        FROM mandiledger
        WHERE LedgerId = ? AND companyid = ? AND yearid = ?
      `, [ledgerId, companyid, yearid]);

      const openingBalance = result[0] || { OpeningBalance: 0, OpeningBalanceDate: null };
      res.json(openingBalance);
    } catch (error) {
      console.error('Error in getOpeningBalance:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Create new ledger account
  createLedgerAccount: async (req, res) => {
    try {
      const data = req.body;
      const companyid = req.companyid;
      const yearid = req.yearid;
      const userid = req.userid;

      const query = `
        INSERT INTO mandiledger
        (LedgerNo, CustomerNo, FarmerNo, Name, address, state_id, cityid, MobileNo, PhoneNo, GstNo, PanNo,
        OpeningBalance, OpeningBalanceDate, AccountTypeId, AccountType, Status, createdbyid, companyid, yearid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        data.LedgerNo, data.CustomerNo, data.FarmerNo, data.Name, data.address, data.state_id,
        data.cityid, data.MobileNo, data.PhoneNo, data.GstNo, data.PanNo,
        data.OpeningBalance || 0, data.OpeningBalanceDate, data.AccountTypeId, data.AccountType,
        1, userid || 1, companyid, yearid
      ];

      const result = await runQuery(query, params);
      res.json({ success: true, id: result.id });
    } catch (error) {
      console.error('Error in createLedgerAccount:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update ledger account
  updateLedgerAccount: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const companyid = req.companyid;
      const yearid = req.yearid;
      const userid = req.userid;

      const query = `
        UPDATE mandiledger SET
        LedgerNo = ?, CustomerNo = ?, FarmerNo = ?, Name = ?, address = ?, state_id = ?, cityid = ?,
        MobileNo = ?, PhoneNo = ?, GstNo = ?, PanNo = ?, OpeningBalance = ?, OpeningBalanceDate = ?,
        AccountTypeId = ?, AccountType = ?, updatedbyid = ?, updatedbydate = CURRENT_TIMESTAMP,
        companyid = ?, yearid = ?
        WHERE LedgerId = ?
      `;

      const params = [
        data.LedgerNo, data.CustomerNo, data.FarmerNo, data.Name, data.address, data.state_id,
        data.cityid, data.MobileNo, data.PhoneNo, data.GstNo, data.PanNo,
        data.OpeningBalance || 0, data.OpeningBalanceDate,
        data.AccountTypeId, data.AccountType, userid || 1, companyid, yearid, id
      ];

      const result = await runQuery(query, params);
      res.json({ success: true, changes: result.changes });
    } catch (error) {
      console.error('Error in updateLedgerAccount:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Delete ledger account
  deleteLedgerAccount: async (req, res) => {
    try {
      const { id } = req.params;
      const companyid = req.companyid;
      const yearid = req.yearid;
      await runQuery("DELETE FROM mandiledger WHERE LedgerId = ? AND companyid = ? AND yearid = ?", [id, companyid, yearid]);
      res.json({ success: true });
    } catch (error) {
      console.error('Error in deleteLedgerAccount:', error);
      res.status(500).json({ error: error.message });
    }
  },

 

  getLedgerStatement: async (req, res) => {
    try {
      const { ledgerId } = req.params;
      const { fromDate, toDate } = req.query;
      const companyid = req.companyid;
      const yearid = req.yearid;

      console.log('getLedgerStatement called with:', { ledgerId, fromDate, toDate });

      if (!fromDate || !toDate) {
        return res.status(400).json({ error: 'From and To dates are required.' });
      }

      // First, get the ledger details to check if it exists
      const ledgerCheck = await getAll('SELECT * FROM mandiledger WHERE LedgerId = ? AND companyid = ? AND yearid = ?', [ledgerId, companyid, yearid]);
      if (ledgerCheck.length === 0) {
        return res.status(404).json({ error: 'Ledger not found' });
      }
const query = `
SELECT 0 AS SortOrder,
       DATE(?) AS Date,
       '' AS BillNo,
       'Opening Balance' AS Description,
       '' AS Type,
       CASE WHEN FinalOpeningBalance > 0 THEN FinalOpeningBalance ELSE 0 END AS Debit,
       CASE WHEN FinalOpeningBalance < 0 THEN ABS(FinalOpeningBalance) ELSE 0 END AS Credit,
       FinalOpeningBalance AS Balance,
       NULL AS TotalItems
FROM (
    SELECT 
    m.LedgerId,
    m.Name,

    (
       m.OpeningBalance

       -- Bills: जितक्या Bill amounts आहेत त्या सर्व वाढवा
       + IFNULL((
           SELECT SUM(ch.FinalBillAmount)
           FROM customerbillheader ch
           WHERE ch.CustomerID = m.CustomerNo
             AND DATE(ch.custBillDate) < DATE(?)
             AND ch.companyid = ?
             AND ch.yearid = ?
       ), 0)

       -- CashBook मधल्या PAYMENT transactions (जमा)
       + IFNULL((
           SELECT SUM(c.Amount)
           FROM CashBook c
           WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
             AND c.TransactionType = 'Payment'
             AND DATE(c.TransactionDate) < DATE(?)
             AND c.companyid = ?
             AND c.yearid = ?
       ), 0)

       -- CashBook मधल्या RECEIPT transactions (काढून टाका)
       - IFNULL((
           SELECT SUM(c.Amount)
           FROM CashBook c
           WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
             AND c.TransactionType = 'Receipt'
             AND DATE(c.TransactionDate) < DATE(?)
             AND c.companyid = ?
             AND c.yearid = ?
       ), 0)

    ) AS FinalOpeningBalance

FROM mandiledger m
WHERE m.LedgerId = ?
  AND m.companyid = ?
  AND m.yearid = ?
)

UNION ALL

SELECT 1 AS SortOrder,
       DATE(c.TransactionDate),
       c.VoucherNumber AS BillNo,
       c.Description,
       c.TransactionType AS Type,
       CASE WHEN c.TransactionType='Payment' THEN c.Amount ELSE 0 END AS Debit,
       CASE WHEN c.TransactionType='Receipt' THEN c.Amount ELSE 0 END AS Credit,
       0 AS Balance,
       NULL AS TotalItems
FROM CashBook c
WHERE (c.CashBankID = ? OR c.OppBankID = ?)
  AND DATE(c.TransactionDate) BETWEEN DATE(?) AND DATE(?)
  AND c.companyid = ? AND c.yearid = ?

    UNION ALL

    SELECT 1 AS SortOrder,
       DATE(ch.custBillDate),
       ch.custBillNumber AS BillNo,
       'Customer Bill' AS Description,
       'Customer Bill' AS Type,
       ch.FinalBillAmount AS Debit,
       0 AS Credit,
       0 AS Balance,
       ch.TotalItems AS TotalItems
    FROM customerbillheader ch
    WHERE ch.CustomerID = (SELECT CustomerNo FROM mandiledger WHERE LedgerId = ? AND companyid = ? AND yearid = ?)
      AND DATE(ch.custBillDate) BETWEEN DATE(?) AND DATE(?)
      AND ch.companyid = ? AND ch.yearid = ?

ORDER BY SortOrder, Date;

`;


      const params = [
        fromDate, fromDate, companyid, yearid, fromDate, companyid, yearid, fromDate, companyid, yearid, ledgerId, companyid, yearid, // OpeningData
        ledgerId, ledgerId, fromDate, toDate, companyid, yearid, // CashBook
        ledgerId, companyid, yearid, fromDate, toDate, companyid, yearid // CustomerBill
      ];

      console.log('Query params:', params);
      console.log('Executing query:', query);

      const entries = await getAll(query, params);
      console.log('Query result count:', entries.length);

      // Calculate running balance in JavaScript
      let runningBalance = 0;
      const entriesWithBalance = entries.map(entry => {
        runningBalance += (entry.Debit || 0) - (entry.Credit || 0);
        return { ...entry, Balance: runningBalance };
      });

      res.json(entriesWithBalance);
    } catch (error) {
      console.error('Error in getLedgerStatement:', error);
      res.status(500).json({ error: error.message });
    }
  },

   getLedgerStatementFarmer: async (req, res) => {
    try {
      const { ledgerId } = req.params;
      const { fromDate, toDate } = req.query;
      const companyid = req.companyid;
      const yearid = req.yearid;

      console.log('getLedgerStatementFarmer called with:', { ledgerId, fromDate, toDate });

      if (!fromDate || !toDate) {
        return res.status(400).json({ error: 'From and To dates are required.' });
      }

      // First, get the ledger details to check if it exists
      const ledgerCheck = await getAll('SELECT * FROM mandiledger WHERE LedgerId = ? AND companyid = ? AND yearid = ?', [ledgerId, companyid, yearid]);
      if (ledgerCheck.length === 0) {
        return res.status(404).json({ error: 'Ledger not found' });
      }

      const query = `
WITH Combined AS (

    -- Opening Balance (Credit)
    SELECT
        0 AS SortOrder,
        DATE(?) AS Date,
        '' AS BillNo,
        'Opening Balance' AS Description,
        '' AS Type,
        0 AS Debit,   -- Opening Balance now in Credit
        CASE
            WHEN FinalOpeningBalance > 0 THEN FinalOpeningBalance
            ELSE 0
        END AS Credit,
        NULL AS TotalItems
    FROM (
        SELECT
            m.LedgerId,
            (
                m.OpeningBalance
                + IFNULL(
                    (
                        SELECT SUM(ch.FinalBillAmount)
                        FROM FarmerBill ch
                        WHERE ch.FarmerID = m.FarmerNo
                          AND DATE(ch.farBillDate) < DATE(?)
                          AND ch.companyid = ?
                          AND ch.yearid = ?
                    ), 0
                )
                + IFNULL(
                    (
                        SELECT SUM(c.Amount)
                        FROM CashBook c
                        WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                          AND c.TransactionType = 'Payment'
                          AND DATE(c.TransactionDate) < DATE(?)
                          AND c.companyid = ?
                          AND c.yearid = ?
                    ), 0
                )
                - IFNULL(
                    (
                        SELECT SUM(c.Amount)
                        FROM CashBook c
                        WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                          AND c.TransactionType = 'Receipt'
                          AND DATE(c.TransactionDate) < DATE(?)
                          AND c.companyid = ?
                          AND c.yearid = ?
                    ), 0
                )
            ) AS FinalOpeningBalance
        FROM mandiledger m
        WHERE m.LedgerId = ?
          AND m.companyid = ?
          AND m.yearid = ?
    )

    UNION ALL

    -- CashBook Entries
    SELECT
        1 AS SortOrder,
        DATE(c.TransactionDate) AS Date,
        c.VoucherNumber AS BillNo,
        c.Description,
        c.TransactionType AS Type,

        -- Payments should be shown as Debit
        CASE WHEN c.TransactionType = 'Payment' THEN c.Amount ELSE 0 END AS Debit,
        CASE WHEN c.TransactionType = 'Receipt' THEN c.Amount ELSE 0 END AS Credit,
        NULL AS TotalItems

    FROM CashBook c
    WHERE (c.CashBankID = ? OR c.OppBankID = ?)
      AND DATE(c.TransactionDate) BETWEEN DATE(?) AND DATE(?)
      AND c.companyid = ? AND c.yearid = ?

    UNION ALL

    -- FarmerBill Amount should appear as Credit
    SELECT
        1 AS SortOrder,
        DATE(fb.farBillDate) AS Date,
        fb.farBillNumber AS BillNo,
        'Farmer Bill' AS Description,
        'Farmer Bill' AS Type,
        0 AS Debit,               -- FarmerBills now go in Credit
        fb.FinalBillAmount AS Credit,
        fb.TotalItems AS TotalItems

    FROM FarmerBill fb
    WHERE fb.FarmerID = (
            SELECT FarmerNo
            FROM mandiledger
            WHERE LedgerId = ?
              AND companyid = ?
              AND yearid = ?
          )
      AND DATE(fb.farBillDate) BETWEEN DATE(?) AND DATE(?)
      AND fb.companyid = ? AND fb.yearid = ?

)

SELECT
    Date,
    BillNo,
    Description,
    Type,
    Debit,
    Credit,
    SUM(Credit - Debit) OVER (ORDER BY SortOrder, Date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS Balance,
    TotalItems
FROM Combined
ORDER BY SortOrder, Date;

`;

      const params = [
        fromDate, // Opening Date
        fromDate, companyid, yearid, // FarmerBill subquery
        fromDate, companyid, yearid, // Payment subquery
        fromDate, companyid, yearid, // Receipt subquery
        ledgerId, companyid, yearid, // mandiledger where
        ledgerId, ledgerId, fromDate, toDate, companyid, yearid, // CashBook
        ledgerId, companyid, yearid, fromDate, toDate, companyid, yearid // FarmerBill
      ];

      console.log('Farmer Query params:', params);

      const entries = await getAll(query, params);
      console.log('Farmer Query result count:', entries.length);

      // Calculate running balance in JavaScript
      let runningBalance = 0;
      const entriesWithBalance = entries.map(entry => {
        runningBalance += (entry.Debit || 0) - (entry.Credit || 0);
        return { ...entry, Balance: runningBalance };
      });

      res.json(entriesWithBalance);
    } catch (error) {
      console.error('Error in getLedgerStatementFarmer:', error);
      res.status(500).json({ error: error.message });
    }
  },
};