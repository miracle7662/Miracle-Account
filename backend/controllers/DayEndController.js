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
  // Get latest current date
  getLatestCurrDate: async (req, res) => {
    try {
      // For now, return today's date
      // In a real application, this might fetch from a dayend table or configuration
      const currDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      res.json({
        success: true,
        curr_date: currDate
      });
    } catch (error) {
      console.error('Error in getLatestCurrDate:', error);
      res.status(500).json({ error: error.message });
    }
  }
};
