const db = require('../config/db');

// Helper functions
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

const getSingle = (query, params = []) => {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(query);
      const row = stmt.get(params);
      resolve(row);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  // Get Profit & Loss Statement
  getPLReport: async (req, res) => {
    try {
      const { fromDate, toDate } = req.query;
      const companyid = req.companyid;
      const yearid = req.yearid;

      if (!fromDate || !toDate) {
        return res.status(400).json({ error: 'From and To dates are required.' });
      }

      // Calculate Revenue (Income)
      const revenue = await calculateRevenue(companyid, yearid, fromDate, toDate);

      // Calculate Expenses
      const expenses = await calculateExpenses(companyid, yearid, fromDate, toDate);

      // Calculate Net Profit/Loss
      const totalRevenue = revenue.reduce((sum, item) => sum + (item.amount || 0), 0);
      const totalExpenses = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
      const netProfitLoss = totalRevenue - totalExpenses;

      const plStatement = {
        period: {
          fromDate,
          toDate
        },
        revenue: {
          items: revenue,
          total: totalRevenue
        },
        expenses: {
          items: expenses,
          total: totalExpenses
        },
        netProfitLoss,
        summary: {
          totalRevenue,
          totalExpenses,
          netProfitLoss,
          isProfit: netProfitLoss >= 0
        }
      };

      res.json(plStatement);
    } catch (error) {
      console.error('Error in getPLReport:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

// Calculate Revenue (Income sources)
async function calculateRevenue(companyid, yearid, fromDate, toDate) {
  const revenue = [];

  try {
    // 1. Customer Bills (Sales Revenue)
    const customerBills = await getAll(`
      SELECT
        'Customer Bills' as category,
        'Sales Revenue' as subcategory,
        SUM(ch.FinalBillAmount) as amount,
        COUNT(*) as count
      FROM customerbillheader ch
      WHERE ch.companyid = ? AND ch.yearid = ?
        AND DATE(ch.custBillDate) BETWEEN DATE(?) AND DATE(?)
    `, [companyid, yearid, fromDate, toDate]);

    if (customerBills[0] && customerBills[0].amount > 0) {
      revenue.push({
        category: 'Sales Revenue',
        description: 'Customer Bills',
        amount: customerBills[0].amount,
        count: customerBills[0].count
      });
    }

    // 2. Receipt transactions in CashBook (Other Income)
    const receipts = await getAll(`
      SELECT
        'Receipts' as category,
        'Other Income' as subcategory,
        SUM(cb.Amount) as amount,
        COUNT(*) as count
      FROM CashBook cb
      WHERE cb.companyid = ? AND cb.yearid = ?
        AND cb.TransactionType = 'Receipt'
        AND DATE(cb.TransactionDate) BETWEEN DATE(?) AND DATE(?)
    `, [companyid, yearid, fromDate, toDate]);

    if (receipts[0] && receipts[0].amount > 0) {
      revenue.push({
        category: 'Other Income',
        description: 'Receipts',
        amount: receipts[0].amount,
        count: receipts[0].count
      });
    }

    // 3. Opening balance adjustments (if positive, treat as income)
    const openingBalances = await getAll(`
      SELECT
        'Opening Balances' as category,
        'Balance Adjustments' as subcategory,
        SUM(CASE WHEN m.OpeningBalance > 0 THEN m.OpeningBalance ELSE 0 END) as amount,
        COUNT(*) as count
      FROM mandiledger m
      WHERE m.companyid = ? AND m.yearid = ?
        AND m.OpeningBalance > 0
    `, [companyid, yearid]);

    if (openingBalances[0] && openingBalances[0].amount > 0) {
      revenue.push({
        category: 'Opening Balance',
        description: 'Positive Opening Balances',
        amount: openingBalances[0].amount,
        count: openingBalances[0].count
      });
    }

  } catch (error) {
    console.error('Error calculating revenue:', error);
  }

  return revenue;
}

// Calculate Expenses
async function calculateExpenses(companyid, yearid, fromDate, toDate) {
  const expenses = [];

  try {
    // 1. Farmer Bills (Purchase Expenses)
    const farmerBills = await getAll(`
      SELECT
        'Farmer Bills' as category,
        'Purchase Expenses' as subcategory,
        SUM(fb.FinalBillAmount) as amount,
        COUNT(*) as count
      FROM FarmerBill fb
      WHERE fb.companyid = ? AND fb.yearid = ?
        AND DATE(fb.farBillDate) BETWEEN DATE(?) AND DATE(?)
    `, [companyid, yearid, fromDate, toDate]);

    if (farmerBills[0] && farmerBills[0].amount > 0) {
      expenses.push({
        category: 'Purchase Expenses',
        description: 'Farmer Bills',
        amount: farmerBills[0].amount,
        count: farmerBills[0].count
      });
    }

    // 2. Payment transactions in CashBook (Other Expenses)
    const payments = await getAll(`
      SELECT
        'Payments' as category,
        'Other Expenses' as subcategory,
        SUM(cb.Amount) as amount,
        COUNT(*) as count
      FROM CashBook cb
      WHERE cb.companyid = ? AND cb.yearid = ?
        AND cb.TransactionType = 'Payment'
        AND DATE(cb.TransactionDate) BETWEEN DATE(?) AND DATE(?)
    `, [companyid, yearid, fromDate, toDate]);

    if (payments[0] && payments[0].amount > 0) {
      expenses.push({
        category: 'Other Expenses',
        description: 'Payments',
        amount: payments[0].amount,
        count: payments[0].count
      });
    }

    // 3. Opening balance adjustments (if negative, treat as expense)
    const openingBalances = await getAll(`
      SELECT
        'Opening Balances' as category,
        'Balance Adjustments' as subcategory,
        SUM(CASE WHEN m.OpeningBalance < 0 THEN ABS(m.OpeningBalance) ELSE 0 END) as amount,
        COUNT(*) as count
      FROM mandiledger m
      WHERE m.companyid = ? AND m.yearid = ?
        AND m.OpeningBalance < 0
    `, [companyid, yearid]);

    if (openingBalances[0] && openingBalances[0].amount > 0) {
      expenses.push({
        category: 'Opening Balance',
        description: 'Negative Opening Balances',
        amount: openingBalances[0].amount,
        count: openingBalances[0].count
      });
    }

  } catch (error) {
    console.error('Error calculating expenses:', error);
  }

  return expenses;
}
