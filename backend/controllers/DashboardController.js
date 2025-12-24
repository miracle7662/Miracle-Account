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

module.exports = {
  // Get dashboard overview data
  getOverview: async (req, res) => {
    try {
      const { companyid } = req.query;

      // Get farmers count
      const farmersQuery = `SELECT COUNT(*) as count FROM mandiledger WHERE AccountType = 'SUNDRY CREDITORS(Supplier)'`;
      const farmersParams = companyid ? [companyid] : [];
      if (companyid) farmersQuery += ` AND companyid = ?`;
      const farmersResult = await getAll(farmersQuery, farmersParams);
      const farmers = farmersResult[0]?.count || 0;

      // Get customers count
      const customersQuery = `SELECT COUNT(*) as count FROM mandiledger WHERE AccountType = 'SUNDRY DEBTORS(Customer)'`;
      const customersParams = companyid ? [companyid] : [];
      if (companyid) customersQuery += ` AND companyid = ?`;
      const customersResult = await getAll(customersQuery, customersParams);
      const customers = customersResult[0]?.count || 0;

      // Get customer bills count
      const customerBillsQuery = `SELECT COUNT(*) as count FROM customerbillheader WHERE StatusCode = 1`;
      const customerBillsParams = companyid ? [companyid] : [];
      if (companyid) customerBillsQuery += ` AND companyid = ?`;
      const customerBillsResult = await getAll(customerBillsQuery, customerBillsParams);
      const customerBills = customerBillsResult[0]?.count || 0;

      // Get farmer bills count
      const farmerBillsQuery = `SELECT COUNT(*) as count FROM FarmerBill WHERE StatusCode = 1`;
      const farmerBillsParams = companyid ? [companyid] : [];
      if (companyid) farmerBillsQuery += ` AND companyid = ?`;
      const farmerBillsResult = await getAll(farmerBillsQuery, farmerBillsParams);
      const farmerBills = farmerBillsResult[0]?.count || 0;

      // Total bills
      const totalBills = customerBills + farmerBills;

      // Today's bills (assuming today's date)
      const today = new Date().toISOString().split('T')[0];
      const todaysBillsQuery = `
        SELECT COUNT(*) as count FROM (
          SELECT custBillID FROM customerbillheader WHERE custBillDate = ? AND StatusCode = 1
          UNION ALL
          SELECT farBillID FROM FarmerBill WHERE farBillDate = ? AND StatusCode = 1
        )
      `;
      const todaysBillsParams = [today, today];
      const todaysBillsResult = await getAll(todaysBillsQuery, todaysBillsParams);
      const todaysBills = todaysBillsResult[0]?.count || 0;

      res.json({
        farmers,
        customers,
        customerBills,
        farmerBills,
        totalBills,
        todaysBills
      });
    } catch (error) {
      console.error('Error in getOverview:', error);
      res.status(500).json({ error: error.message });
    }
  }
};
