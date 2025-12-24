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
  // Get all years
  getYears: async (req, res) => {
    try {
      const rows = await getAll(`SELECT * FROM yearmaster ORDER BY yearid DESC`);
      res.json(rows);
    } catch (error) {
      console.error('Error in getYears:', error);
      res.status(500).json({ error: error.message, stack: error.stack });
    }
  },

  // Get year by user selected yearid
  getYearByUser: async (req, res) => {
    try {
      const userYearId = req.user?.yearid;
      if (!userYearId) {
        return res.status(400).json({ error: 'User yearid not found' });
      }

      const rows = await getAll(`SELECT * FROM yearmaster WHERE yearid = ?`, [userYearId]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Year not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error('Error in getYearByUser:', error);
      res.status(500).json({ error: error.message, stack: error.stack });
    }
  },

  // Add new year
  createYear: async (req, res) => {
    try {
      const { Year, Startdate, Enddate, status } = req.body;

      const query = `
        INSERT INTO yearmaster (Year, Startdate, Enddate, status)
        VALUES (?, ?, ?, ?)
      `;

      const params = [Year, Startdate, Enddate, status || 1];
      const result = await runQuery(query, params);
      res.json({ success: true, id: result.id });

    } catch (err) {
      console.error('Error in createYear:', err);
      res.status(500).json({ error: err.message });
    }
  },

  // Update year
  updateYear: async (req, res) => {
    try {
      const id = req.params.id;
      const { Year, Startdate, Enddate, status } = req.body;

      const query = `
        UPDATE yearmaster SET Year = ?, Startdate = ?, Enddate = ?, status = ?
        WHERE yearid = ?
      `;

      const params = [Year, Startdate, Enddate, status, id];
      const result = await runQuery(query, params);
      res.json({ success: true, changes: result.changes });

    } catch (err) {
      console.error('Error in updateYear:', err);
      res.status(500).json({ error: err.message });
    }
  },

  // Delete year
  deleteYear: async (req, res) => {
    try {
      const id = req.params.id;
      await runQuery("DELETE FROM yearmaster WHERE yearid = ?", [id]);
      res.json({ success: true });

    } catch (err) {
      console.error('Error in deleteYear:', err);
      res.status(500).json({ error: err.message });
    }
  },
};
