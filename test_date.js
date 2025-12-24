const db = require('./backend/config/db');

const companyid = 1;
const yearid = 1;
const customerId = 1;
const billDate = '2024-01-01';

try {
  const lastBill = db.prepare(`
    SELECT custBillDate
    FROM customerbillheader
    WHERE CustomerID = ? AND DATE(custBillDate) < DATE(?) AND companyid = ? AND yearid = ?
    ORDER BY custBillDate DESC
    LIMIT 1
  `).get(customerId, billDate, companyid, yearid);

  console.log('Last Bill Result:', lastBill);

  // Also check if there are any bills at all for this customer
  const allBills = db.prepare(`
    SELECT custBillDate
    FROM customerbillheader
    WHERE CustomerID = ? AND companyid = ? AND yearid = ?
    ORDER BY custBillDate DESC
  `).all(customerId, companyid, yearid);

  console.log('All Bills for customer:', allBills);
} catch (error) {
  console.error('Error:', error);
}
