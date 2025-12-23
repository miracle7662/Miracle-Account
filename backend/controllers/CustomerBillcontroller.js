const db = require('../config/db');

// Helper → return all rows
const getAll = (query, params = []) => {
  // Using better-sqlite3 synchronous API
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
  // Using better-sqlite3 synchronous API
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

// =============================
// GET NEXT BILL NUMBER (Based on custBillNumber)
// =============================
async function getNextcustBillNumber(companyid, yearid) {
    try {
        console.log("getNextcustBillNumber - Starting function");
        const rows = await getAll(`
            SELECT
                MAX(CAST(SUBSTR(custBillNumber, 4) AS INTEGER)) AS maxBillNo
            FROM customerbillheader
            WHERE companyid = ? AND yearid = ?
        `, [companyid, yearid]);
        console.log("getNextcustBillNumber - maxBillNo row:", rows[0]);

        const nextNo = (rows[0]?.maxBillNo || 0) + 1;
        const nextcustBillNumber = `CB-${nextNo.toString().padStart(3, '0')}`;
        console.log('getNextcustBillNumber - Generated CustBillNo:', nextcustBillNumber);
        return nextcustBillNumber;
    } catch (error) {
        console.error("getNextcustBillNumber - Error:", error);
        return 'CB-001';
    }
}

// =====================================================================
// CUSTOMER BILL CONTROLLER (Header + Items)
// =====================================================================
module.exports = {
  // -------------------------------------------------
  // 1️⃣ GET ALL CUSTOMER BILL HEADERS
  // -------------------------------------------------
  getBillHeaders: async (req, res) => {
    try {
      const companyid = req.companyid;
      const yearid = req.yearid;

      const query = `SELECT * FROM customerbillheader WHERE companyid = ? AND yearid = ? ORDER BY custBillID DESC`;

      const rows = await getAll(query, [companyid, yearid]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------------------------
  // 2️⃣ GET SINGLE BILL HEADER BY ID
  // -------------------------------------------------
  getBillHeaderById: async (req, res) => {
    try {
      const id = req.params.id;
      const companyid = req.companyid;
      const yearid = req.yearid;

      // Check ownership
      const header = await getAll(`SELECT * FROM customerbillheader WHERE custBillID = ? AND companyid = ? AND yearid = ?`, [id, companyid, yearid]);
      if (!header[0]) {
        return res.status(404).json({ message: "Not found" });
      }

      const items = await getAll(`SELECT * FROM customerbillitems WHERE custBillID = ?`, [id]);

      // Map database fields to frontend expected fields
      const mappedHeader = {
        ...header[0],
        TransportCharges: header[0].TransportCharges || 0,
        Discount: header[0].Discount || 0, // This is the percentage
        TotalDiscount: header[0].TotalDiscount || 0, // This is the amount
        TotalExpense: header[0].TotalExpense || 0,
        FinalBillAmount: header[0].FinalBillAmount || 0,
        PreviousBalance: header[0].PreviousBalance || 0,
        PreviousAdvance: header[0].PreviousAdvance || 0,
        DepositCash: header[0].DepositCash || 0,
      };

      res.json({ ...mappedHeader, items });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------------------------
  // 3️⃣ CREATE BILL HEADER
  // -------------------------------------------------
  // Updated createBillHeader in CustomerBillcontroller.js
  createBillHeader: async (req, res) => {
    try {
      const d = req.body;
      const companyid = req.companyid;
      const yearid = req.yearid;
      console.log('Received payload:', JSON.stringify(d, null, 2));

      // Validate required fields
      if (!d.BillDate || !d.CustomerNo || !d.TotalItems || !d.TotalCustomerAmt) {
        return res.status(400).json({
          error: 'Missing required fields: BillDate, CustomerNo, TotalItems, TotalCustomerAmt'
        });
      }

      // Check for duplicate bill on the same date for the customer
      const existingBill = await getAll(`
        SELECT custBillID FROM customerbillheader
        WHERE CustomerID = ? AND custBillDate = ? AND companyid = ? AND yearid = ?
      `, [d.CustomerNo, d.BillDate, companyid, yearid]);

      if (existingBill.length > 0) {
        return res.status(400).json({ error: "Bill already exists for this customer on this date." });
      }

      // Always generate BillNo
      let nextcustBillNumber = await getNextcustBillNumber(companyid, yearid);
      if (!nextcustBillNumber) {
          console.error('createBillHeader - nextcustBillNumber is null or undefined, using fallback "CB-001"');
          nextcustBillNumber = 'CB-001';
      }
      console.log('Generated BillNo:', nextcustBillNumber);

      // ⭐ FETCH CUSTOMER NAME FROM mandiledger
      const custRows = await getAll("SELECT Name FROM mandiledger WHERE CustomerNo = ? AND companyid = ? AND yearid = ?", [d.CustomerNo, companyid, yearid]);
      const customerName = custRows[0] ? custRows[0].Name : "";
      console.log("CustomerName Found:", customerName);

      // ⭐ FETCH PREVIOUS BALANCE AND DATE FOR CUSTOMER
      const balanceQuery = `
        SELECT
          m.LedgerId,
          m.CustomerNo,
          m.Name,
          (
            -- base Opening Balance
            m.OpeningBalance

            -- Bills Total
            + IFNULL((
                SELECT SUM(ch.FinalBillAmount)
                FROM customerbillheader ch
                WHERE ch.CustomerID = m.CustomerNo
                  AND DATE(ch.custBillDate) < DATE(?)
                  AND ch.companyid = ?
                  AND ch.yearid = ?
            ), 0)

            -- CashBook PAYMENT (Add)
            + IFNULL((
                SELECT SUM(c.Amount)
                FROM CashBook c
                WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                  AND c.TransactionType = 'Payment'
                  AND DATE(c.TransactionDate) < DATE(?)
                  AND c.companyid = ?
                  AND c.yearid = ?
            ), 0)

            -- CashBook RECEIPT (Subtract)
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
        WHERE m.customerNo = ? AND m.companyid = ? AND m.yearid = ?
      `;
      const balanceParams = [
        d.BillDate, companyid, yearid,  // For customer bills
        d.BillDate, companyid, yearid,  // For payments
        d.BillDate, companyid, yearid,  // For receipts
        d.CustomerNo, companyid, yearid // For mandiledger
      ];

      const balanceResult = await getAll(balanceQuery, balanceParams);
      const fetchedPreviousBalance = balanceResult.length > 0 ? balanceResult[0].FinalOpeningBalance || 0 : 0;

      // Get the most recent bill date for previousDate
      const lastBill = await getAll(`
        SELECT custBillDate
        FROM customerbillheader
        WHERE CustomerID = ? AND DATE(custBillDate) < DATE(?) AND companyid = ? AND yearid = ?
        ORDER BY custBillDate DESC
        LIMIT 1
      `, [d.CustomerNo, d.BillDate, companyid, yearid]);
      const fetchedPreviousDate = lastBill.length > 0 ? lastBill[0].custBillDate : '';

      console.log("Fetched Previous Balance:", fetchedPreviousBalance);
      console.log("Fetched Previous Date:", fetchedPreviousDate);

      // Extract fields from payload (now using sent values)
      const totalCustomerSum = d.TotalCustomerAmt || 0;  // Assuming this is now customer sum only (fixed in frontend)
      const totalCommission = d.TotalCommission || 0;
      const discountPercent = d.Discount || 0; // The percentage value
      const totalDiscountAmount = d.TotalDiscount || 0; // The calculated amount
      const transportCharges = d.TransportCharges || 0;
      const totalExpense = d.TotalExpense || 0;
      const previousBalance = fetchedPreviousBalance;  // Use fetched value instead of req.body
      const previousAdvance = d.PreviousAdvance || 0;
      const finalBillAmount = d.FinalBillAmount || 0;  // Use calculated from frontend
      const finalTotalAmount = totalCustomerSum + totalCommission - totalDiscountAmount;  // Subtotal after discount (before expense/advance)

      const sql = `INSERT INTO customerbillheader (
        custBillNumber, custBillDate, SoudaID, CustomerID, CustomerName, TotalItems,
        TotalAmount, TotalDiscount, FinalTotalAmount, PreviousBalance, PreviousAdvance,
        Discount, katalaAmount, TotalExpense, FinalBillAmount, TransportCharges, DepositCash,
        StatusCode, Created_by_id, companyid, yearid
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

      const params = [
        nextcustBillNumber, d.BillDate, null, d.CustomerNo, customerName,
        d.TotalItems, totalCustomerSum, totalDiscountAmount, finalTotalAmount, previousBalance,
        previousAdvance, discountPercent, totalCommission, totalExpense, finalBillAmount, transportCharges, d.DepositCash || 0,
        1, d.created_by_id || req.userid || 1, companyid, yearid
      ];

      console.log("Header params:", params);

      const result = await runQuery(sql, params);
      const headerId = result.id;
      console.log('Header inserted with ID:', headerId);

      // Insert items (unchanged)
      if (d.items && Array.isArray(d.items)) {
        console.log('Inserting', d.items.length, 'items');

        const itemSql = `INSERT INTO customerbillitems (
          custBillID, FarmerID, FarmerName, ItemName, Quantity,
          FarmerAmount, CustomerAmount, Discount, FinalAmount,
          StatusCode, Created_by_id
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

        for (const item of d.items) {
          const farmerName = item.FarmerName || "";
          const commission = item.Commission || 0;
          const farmerAmount = (item.CustomerAmount || 0) - commission;
          const finalAmount = (item.CustomerAmount || 0) + commission;

          const itemParams = [
            headerId,
            item.FarmerID || 0,
            farmerName,
            item.ItemName,
            item.Quantity || 0,
            farmerAmount,
            item.CustomerAmount || 0,
            0,  // Discount
            finalAmount,
            1,
            d.created_by_id || req.userid || 1
           
          ];

          console.log("Item params:", itemParams);

          await runQuery(itemSql, itemParams);
        }

        // Update IsBilled in soudaitemsdetails for the selected items
        const itemIDs = d.items.map(item => item.ItemID).filter(id => id);
        if (itemIDs.length > 0) {
          await runQuery(`UPDATE soudaitemsdetails SET IsBilled = 1 WHERE ItemID IN (${itemIDs.map(() => '?').join(',')}) AND companyid = ? AND yearid = ?`, [...itemIDs, companyid, yearid]);
          console.log('Updated IsBilled for ItemIDs:', itemIDs);
        }
      }

      res.json({ success: true, custBillID: headerId, custBillNumber: nextcustBillNumber });

    } catch (err) {
      console.error("Error in createBillHeader:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------------------------
  // 4️⃣ UPDATE BILL HEADER (now handles items too)
  // -------------------------------------------------
  // Updated updateBillHeader in CustomerBillcontroller.js
  updateBillHeader: async (req, res) => {
    try {
      const id = req.params.id;
      const d = req.body;
      const companyid = req.companyid;
      const yearid = req.yearid;

      // Fetch or use customer name
      let customerName = d.CustomerName || "";
      if (!customerName) {
        const custRows = await getAll("SELECT Name FROM mandiledger WHERE CustomerNo = ? AND companyid = ? AND yearid = ?", [d.CustomerNo, companyid, yearid]);
        customerName = custRows[0] ? custRows[0].Name : "";
      }

      // Extract fields from payload (now using sent values)
      const totalCustomerSum = d.TotalCustomerAmt || 0;  // Assuming customer sum only
      const totalCommission = d.TotalCommission || 0;
      const discountPercent = d.Discount || 0; // The percentage value
      const totalDiscountAmount = d.TotalDiscount || 0; // The calculated amount
      const transportCharges = d.TransportCharges || 0;
      const totalExpense = d.TotalExpense || 0;
      const previousBalance = d.PreviousBalance || 0;
      const previousAdvance = d.PreviousAdvance || 0;
      const finalBillAmount = d.FinalBillAmount || 0;  // Use calculated from frontend
      const finalTotalAmount = totalCustomerSum + totalCommission - totalDiscountAmount;

      // Check ownership
      const existingHeader = await getAll(`SELECT custBillID FROM customerbillheader WHERE custBillID = ? AND companyid = ? AND yearid = ?`, [id, companyid, yearid]);
      if (!existingHeader[0]) {
        return res.status(404).json({ message: 'Bill not found or access denied' });
      }

      const sql = `UPDATE customerbillheader SET
        custBillNumber=?, custBillDate=?, SoudaID=?, CustomerID=?, CustomerName=?, TotalItems=?,
        TotalAmount=?, TotalDiscount=?, FinalTotalAmount=?, PreviousBalance=?, PreviousAdvance=?,
        Discount=?, katalaAmount=?, TotalExpense=?, FinalBillAmount=?, TransportCharges=?, DepositCash=?,
        StatusCode=?, Updated_id=?, Updated_date=CURRENT_TIMESTAMP, companyid=?, yearid=?
        WHERE custBillID=? AND companyid=? AND yearid=?`;

      const params = [
        d.custBillNumber || '', d.BillDate || '', null, d.CustomerNo || 0, customerName, d.TotalItems || 0,
        totalCustomerSum, totalDiscountAmount, finalTotalAmount, previousBalance, previousAdvance,
        discountPercent, totalCommission, totalExpense, finalBillAmount, transportCharges, d.DepositCash || 0,
        1, d.Updated_id || req.userid || d.created_by_id || 1, companyid, yearid, id, companyid, yearid
      ];

      await runQuery(sql, params);

      // Delete and re-insert items (unchanged)
      await runQuery(`DELETE FROM customerbillitems WHERE custBillID=?`, [id]);

      if (d.items && Array.isArray(d.items)) {
        const itemSql = `INSERT INTO customerbillitems (
          custBillID, FarmerID, FarmerName, ItemName, Quantity,
          FarmerAmount, CustomerAmount, Discount, FinalAmount,
          StatusCode, Created_by_id
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

        for (const item of d.items) {
          const farmerName = item.FarmerName || "";
          const commission = item.Commission || 0;
          const farmerAmount = (item.CustomerAmount || 0) - commission;
          const finalAmount = (item.CustomerAmount || 0) + commission;

          const itemParams = [
            id,
            item.FarmerID || 0,
            farmerName,
            item.ItemName,
            item.Quantity || 0,
            farmerAmount,
            item.CustomerAmount || 0,
            0,
            finalAmount,
            1,
            d.Updated_id || req.userid || d.created_by_id || 1
          
          ];

          await runQuery(itemSql, itemParams);
        }

        // Update IsBilled in soudaitemsdetails for the selected items
        const itemIDs = d.items.map(item => item.ItemID).filter(id => id);
        if (itemIDs.length > 0) {
          await runQuery(`UPDATE soudaitemsdetails SET IsBilled = 1 WHERE ItemID IN (${itemIDs.map(() => '?').join(',')}) AND companyid = ? AND yearid = ?`, [...itemIDs, companyid, yearid]);
          console.log('Updated IsBilled for ItemIDs:', itemIDs);
        }
      }

      res.json({ success: true });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------------------------
  // 5️⃣ DELETE BILL HEADER
  // -------------------------------------------------
  deleteBillHeader: async (req, res) => {
    try {
      const id = req.params.id;
      const companyid = req.companyid;
      const yearid = req.yearid;

      // Verify ownership
      const existingHeader = await getAll(`SELECT custBillID FROM customerbillheader WHERE custBillID = ? AND companyid = ? AND yearid = ?`, [id, companyid, yearid]);
      if (!existingHeader[0]) {
        return res.status(404).json({ message: 'Bill not found or access denied' });
      }

      // Delete child items first
      await runQuery(`DELETE FROM customerbillitems WHERE custBillID=?`, [id]);

      await runQuery(`DELETE FROM customerbillheader WHERE custBillID=? AND companyid=? AND yearid=?`, [id, companyid, yearid]);

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ==================================================================
  // ITEMS SECTION
  // ==================================================================

  // -------------------------------------------------
  // 6️⃣ GET ITEMS OF BILL
  // -------------------------------------------------
  getBillItems: async (req, res) => {
    try {
      const billID = req.params.billID;
      const companyid = req.companyid;
      const yearid = req.yearid;

      const rows = await getAll(`SELECT * FROM customerbillitems WHERE custBillID=?`, [billID]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------------------------
  // 7️⃣ CREATE ITEM
  // -------------------------------------------------
  createBillItem: async (req, res) => {
    try {
      const d = req.body;
      const companyid = req.companyid;
      const yearid = req.yearid;

      const sql = `INSERT INTO customerbillitems (
        custBillID, FarmerID, FarmerName, ItemName, Quantity,
        FarmerAmount, CustomerAmount, Discount, FinalAmount,
        StatusCode, Created_by_id, companyid, yearid
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

      const params = [
        d.custBillID, d.FarmerID, d.FarmerName, d.ItemName, d.Quantity,
        d.FarmerAmount, d.CustomerAmount, d.Discount, d.FinalAmount,
        d.StatusCode || 1, d.Created_by_id || req.userid || 1, companyid, yearid
      ];

      const result = await runQuery(sql, params);
      res.json({ success: true, ItemID: result.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------------------------
  // 8️⃣ UPDATE ITEM
  // -------------------------------------------------
  updateBillItem: async (req, res) => {
    try {
      const id = req.params.id;
      const d = req.body;
      const companyid = req.companyid;
      const yearid = req.yearid;

      // 1️⃣ Find item to get its bill header ID
      const item = await getAll(
        `SELECT custBillID FROM customerbillitems WHERE ItemID = ?`,
        [id]
      );

      if (!item[0]) {
        return res.status(404).json({ message: 'Item not found' });
      }

      const custBillID = item[0].custBillID;

      // 2️⃣ Validate company ownership from the HEADER table
      const billHeader = await getAll(
        `SELECT custBillID FROM customerbillheader 
         WHERE custBillID = ? AND companyid = ? AND yearid = ?`,
        [custBillID, companyid, yearid]
      );

      if (!billHeader[0]) {
        return res.status(403).json({ message: 'Access denied. The item does not belong to your company/year.' });
      }

      // 3️⃣ Now it's safe to update the item.
      // The customerbillitems table does not have companyid/yearid, so we remove them from the UPDATE query.
      const sql = `UPDATE customerbillitems SET
        FarmerID=?, FarmerName=?, ItemName=?, Quantity=?, FarmerAmount=?,
        CustomerAmount=?, Discount=?, FinalAmount=?, StatusCode=?,
        Updated_id=?, Updated_date=CURRENT_TIMESTAMP
        WHERE ItemID=?`;

      const params = [
        d.FarmerID, d.FarmerName, d.ItemName, d.Quantity, d.FarmerAmount,
        d.CustomerAmount, d.Discount, d.FinalAmount, d.StatusCode || 1,
        d.Updated_id || req.userid || 1,
        id
      ];

      const result = await runQuery(sql, params);
      res.json({ success: true, changes: result.changes });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------------------------
  // 9️⃣ DELETE ITEM
  // -------------------------------------------------
deleteBillItem: async (req, res) => {
  try {
    const id = req.params.id;
    const companyid = req.companyid;
    const yearid = req.yearid;

    // 1️⃣ Find item to get its related bill header ID
    const item = await getAll(
      `SELECT custBillID FROM customerbillitems WHERE ItemID = ?`,
      [id]
    );

    if (!item[0]) {
      return res.status(404).json({ message: "Item not found" });
    }

    const custBillID = item[0].custBillID;

    // 2️⃣ Validate company ownership from the HEADER table (the correct source)
    const billHeader = await getAll(
      `SELECT custBillID FROM customerbillheader 
       WHERE custBillID = ? AND companyid = ? AND yearid = ?`,
      [custBillID, companyid, yearid]
    );

    if (!billHeader[0]) {
      return res.status(403).json({ message: "Access denied" });
    }

    // 3️⃣ Now it's safe to delete the item
    await runQuery(
      `DELETE FROM customerbillitems WHERE ItemID = ?`,
      [id]
    );

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

  // New handler to get next Bill No for frontend use
  getNextcustBillNumberHandler: async (req, res) => {
    try {
        console.log("getNextcustBillNumberHandler called");
        const companyid = req.companyid;
        const yearid = req.yearid;
        const nextcustBillNumber = await getNextcustBillNumber(companyid, yearid);
        console.log("nextcustBillNumber:", nextcustBillNumber);
        if (!nextcustBillNumber) {
            console.error("nextcustBillNumber is null or undefined");
            return res.status(500).json({ message: "Failed to generate bill number" });
        }
        res.json({ nextBillNo: nextcustBillNumber });
    } catch (error) {
        console.error("Error in getNextcustBillNumberHandler:", error);
        res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get last bill for customer before specific date
  getLastBillForCustomer: async (req, res) => {
    try {
      const { customerId, billDate } = req.params;
      const companyid = req.companyid;
      const yearid = req.yearid;

      if (!customerId || !billDate) {
        return res.status(400).json({ error: 'Customer ID and Bill Date are required' });
      }

      // Calculate FinalOpeningBalance using the provided query
      // const balanceQuery = `
      //   SELECT
      //       m.LedgerId,
      //       m.CustomerNo,
      //       m.Name,
      //       (
      //           -- Base opening balance
      //           m.OpeningBalance

      //           -- CashBook Receipts (Before FromDate)
      //           + IFNULL((
      //               SELECT SUM(c.Amount)
      //               FROM CashBook c
      //               WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
      //                 AND c.TransactionType = 'Receipt'
      //                 AND c.CompanyId = ?
      //                 AND c.YearId = ?
      //                 AND DATE(c.TransactionDate) < DATE(?)
      //           ), 0)

      //           -- CashBook Payments (Before FromDate)
      //           - IFNULL((
      //               SELECT SUM(c.Amount)
      //               FROM CashBook c
      //               WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
      //                 AND c.TransactionType = 'Payment'
      //                 AND c.CompanyId = ?
      //                 AND c.YearId = ?
      //                 AND DATE(c.TransactionDate) < DATE(?)
      //           ), 0)

      //           -- Customer Bills (Before FromDate)
      //           + IFNULL((
      //               SELECT SUM(ch.FinalBillAmount)
      //               FROM customerbillheader ch
      //               WHERE ch.CustomerID = m.CustomerNo
      //                 AND ch.CompanyId = ?
      //                 AND ch.YearId = ?
      //                 AND DATE(ch.custBillDate) < DATE(?)
      //           ), 0)

      //       ) AS FinalOpeningBalance

      //   FROM mandiledger m
      //   WHERE m.CustomerNo = ?
      //     AND m.CompanyId = ?
      //     AND m.YearId = ?
      // `;

       const balanceQuery = `
      SELECT 
    m.LedgerId,
    m.CustomerNo,
    m.Name,

    (
      -- base Opening Balance
       m.OpeningBalance

       -- Bills Total
       + IFNULL((
           SELECT SUM(ch.FinalBillAmount)
           FROM customerbillheader ch
           WHERE ch.CustomerID = m.CustomerNo
              AND DATE(ch.custBillDate) < DATE(?)
             AND ch.companyid = ?
             AND ch.yearid = ?
       ), 0)

       -- CashBook PAYMENT (Add)
       + IFNULL((
           SELECT SUM(c.Amount)
           FROM CashBook c
           WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
             AND c.TransactionType = 'Payment'
            AND DATE(c.TransactionDate) < DATE(?)
             AND c.companyid = ?
             AND c.yearid = ?
       ), 0)

       -- CashBook RECEIPT (Subtract)
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
WHERE  m.customerNo = ? AND m.companyid = ? AND m.yearid = ?
`;
      const balanceParams = [
        billDate, companyid, yearid,  // For customer bills
        billDate, companyid, yearid,  // For payments
        billDate, companyid, yearid,  // For receipts
        customerId, companyid, yearid // For mandiledger
      ];

      
      const balanceResult = await getAll(balanceQuery, balanceParams);

      if (balanceResult.length > 0) {
        // Get the most recent bill date for previousDate
        const lastBill = await getAll(`
          SELECT custBillDate
          FROM customerbillheader
          WHERE CustomerID = ? AND DATE(custBillDate) < DATE(?) AND companyid = ? AND yearid = ?
          ORDER BY custBillDate DESC
          LIMIT 1
        `, [customerId, billDate, companyid, yearid]);

        res.json({
          previousDate: lastBill.length > 0 ? lastBill[0].custBillDate : '',
          previousBalance: balanceResult[0].FinalOpeningBalance || 0
        });
      } else {
        res.json({
          previousDate: '',
          previousBalance: 0
        });
      }
    } catch (err) {
      console.error('Error fetching last bill:', err);
      res.status(500).json({ error: err.message });
    }
  },

  // Check if bill exists for customer on specific date
  checkBillExists: async (req, res) => {
    try {
      const { customerId, billDate } = req.params;
      const companyid = req.companyid;
      const yearid = req.yearid;

      if (!customerId || !billDate) {
        return res.status(400).json({ error: 'Customer ID and Bill Date are required' });
      }

      const existingBill = await getAll(`
        SELECT custBillID, custBillNumber
        FROM customerbillheader
        WHERE CustomerID = ? AND custBillDate = ? AND companyid = ? AND yearid = ?
      `, [customerId, billDate, companyid, yearid]);

      if (existingBill.length > 0) {
        res.json({
          exists: true,
          billId: existingBill[0].custBillID,
          billNumber: existingBill[0].custBillNumber,
          message: 'Bill already exists for this customer on this date.'
        });
      } else {
        res.json({ exists: false });
      }
    } catch (err) {
      console.error('Error checking bill existence:', err);
      res.status(500).json({ error: err.message });
    }
  },



};