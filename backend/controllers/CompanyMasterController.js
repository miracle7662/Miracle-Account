const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// Ensure ELECTRON_USER_DATA_PATH is set (fallback for dev mode)
if (!process.env.ELECTRON_USER_DATA_PATH) {
  process.env.ELECTRON_USER_DATA_PATH = path.join(process.cwd(), 'backend', 'userData');
}

// Determine uploads path based on environment (unified to use only ELECTRON_USER_DATA_PATH)
const getUploadsPath = () => {
  return path.join(process.env.ELECTRON_USER_DATA_PATH, 'uploads', 'company_logos');
};

// Ensure uploads directory exists
const ensureUploadsDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Configure multer for company logo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = getUploadsPath();
    ensureUploadsDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'company-logo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Helper to delete old logo file
const deleteOldLogo = (filename) => {
  if (!filename) return;
  const uploadPath = getUploadsPath();
  const filePath = path.join(uploadPath, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Helper to migrate existing full paths to filenames only
const migrateLogoPaths = async () => {
  try {
    const companies = await getAll("SELECT companyid, companylogo FROM companymaster WHERE companylogo IS NOT NULL AND companylogo != ''");
    for (const company of companies) {
      if (company.companylogo && company.companylogo.includes('\\') || company.companylogo.includes('/')) {
        const filename = path.basename(company.companylogo);
        await runQuery("UPDATE companymaster SET companylogo = ? WHERE companyid = ?", [filename, company.companyid]);
        console.log(`Migrated logo path for company ${company.companyid}: ${company.companylogo} -> ${filename}`);
      }
    }
  } catch (error) {
    console.error('Error migrating logo paths:', error);
  }
};

// Helper → return all rows
const getAll = (query, params = []) => {
  // better-sqlite3 is synchronous, no need for a Promise wrapper
  const stmt = db.prepare(query);
  return stmt.all(params);
};


const runQuery = (query, params = []) => {
  // better-sqlite3 is synchronous, no need for a Promise wrapper
  const stmt = db.prepare(query);
  const info = stmt.run(params);
  return { id: info.lastInsertRowid || info.lastInsertROWID || 0, changes: info.changes };
};

// Helper to get current financial year ID from yearmaster table
const getCurrentFinancialYearId = async () => {
  try {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const year = now.getFullYear();
    const currentYear = month >= 4 ? year : year - 1;

    // Find the year record that matches the current financial year
    const yearRecord = await getAll(
      "SELECT yearid FROM yearmaster WHERE Year LIKE ? AND status = 1",
      [`${currentYear}%`]
    );

    if (yearRecord.length > 0) {
      return yearRecord[0].yearid;
    } else {
      // Fallback: get the first active year
      const fallbackYear = await getAll(
        "SELECT yearid FROM yearmaster WHERE status = 1 ORDER BY yearid DESC LIMIT 1"
      );
      return fallbackYear.length > 0 ? fallbackYear[0].yearid : 1;
    }
  } catch (error) {
    console.error('Error getting current financial year ID:', error);
    return 1; // Default fallback
  }
};

// Helper to sanitize and prepare company data from request body
const prepareCompanyData = (data) => {
  return {
    ...data,
    dalali: parseFloat(data.dalali) || 0,
    hamali: parseFloat(data.hamali) || 0,
    vatav: parseFloat(data.vatav) || 0,
    commission: parseFloat(data.commission) || 0,
    is_aavak_req: data.is_aavak_req ? 1 : 0,
    item_readonly: data.item_readonly ? 1 : 0,
    katala_readonly: data.katala_readonly ? 1 : 0,
    status: data.status !== undefined ? parseInt(data.status, 10) : 1,
    stateid: data.stateid && data.stateid !== "" ? parseInt(data.stateid, 10) : null,
    cityid: data.cityid && data.cityid !== "" ? parseInt(data.cityid, 10) : null,
    yearid: data.yearid ? parseInt(data.yearid, 10) : null,
  };
};

module.exports = {
  upload,
  migrateLogoPaths,

  // ------------------------------------
  // 1️⃣ GET ALL COMPANIES
  // ------------------------------------
  getCompanies: async (req, res) => {
    try {
      const query = `SELECT companyid, company_title, company_name, company_address, mobile1, mobile2, stateid, cityid, email, website, sales_tax_no, shop_act_no, pan_no, it_ward, shop_act_renewal_date, gst_in_no, is_aavak_req, item_readonly, katala_readonly, dalali, hamali, vatav, commission, status, companylogo, Name1, Name2, created_date, updated_date FROM companymaster WHERE status = 1 ORDER BY company_name ASC`;
      const rows = await getAll(query);
      // Normalize companylogo to filename only
      rows.forEach(row => {
        if (row.companylogo) {
          row.companylogo = path.basename(row.companylogo);
        }
      });
      res.json(rows);
    } catch (error) {
      console.error('Error in getCompanies:', error);
      // Avoid sending stack trace to the client in production
      const errorMessage = process.env.NODE_ENV === 'production'
        ? 'An error occurred while fetching companies.' : error.message;
      res.status(500).json({ error: errorMessage });
    }
  },

  // ------------------------------------
  // GET COMPANIES FOR A SPECIFIC USER (for Login Page)
  // ------------------------------------
  getCompaniesForUser: async (req, res) => {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    try {
      // This query joins the users table with the company table
      // to find all companies a user is associated with.
      const query = `
        SELECT DISTINCT
          c.companyid,
          c.company_name
        FROM mst_users u
        JOIN companymaster c ON u.companyid = c.companyid
        WHERE u.username = ? AND c.status = 1
        ORDER BY c.company_name ASC
      `;
      const rows = await getAll(query, [username]);
      res.json(rows);
    } catch (error) {
      console.error('Error in getCompaniesForUser:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // ------------------------------------
  // GET YEARS FOR A SPECIFIC COMPANY (for Login Page)
  // ------------------------------------
  getYearsForCompany: async (req, res) => {
    // This is the same as getActiveYears for now, but can be customized later
    // if years become company-specific.
    return module.exports.getActiveYears(req, res);
  },
  // ------------------------------------
  // GET ACTIVE YEARS FOR DROPDOWNS
  // ------------------------------------
  getActiveYears: async (req, res) => {
    try {
      const query = `
        SELECT yearid, Year FROM yearmaster 
        WHERE status = 1 
        ORDER BY Year DESC
      `;
      const rows = await getAll(query);
      res.json(rows);
    } catch (error) {
      console.error('Error in getActiveYears:', error);
      res.status(500).json({ error: error.message });
    }
  },
  // ------------------------------------
  // ADD COMPANY
  // ------------------------------------
  createCompany: async (req, res) => {
    try {
      const data = prepareCompanyData(req.body);

      const query = `
        INSERT INTO companymaster
        (company_title, company_name, company_address, mobile1, mobile2, Name1, Name2, stateid, cityid, email, website,
        sales_tax_no, shop_act_no, pan_no, it_ward, shop_act_renewal_date, gst_in_no,
        is_aavak_req, dalali, hamali, vatav, commission, item_readonly, katala_readonly, status, created_date, companylogo, yearid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        data.company_title || '', data.company_name, data.company_address, data.mobile1, data.mobile2 || null,
        data.Name1 || '', data.Name2 || '', data.stateid,
        data.cityid, data.email || '', data.website || '', data.sales_tax_no || '', data.shop_act_no || '',
        data.pan_no || '', data.it_ward || '', data.shop_act_renewal_date || '', data.gst_in_no || '',
        data.is_aavak_req, data.dalali, data.hamali, data.vatav, data.commission, data.item_readonly, data.katala_readonly, data.status, new Date().toISOString(), req.file ? req.file.filename : null, data.yearid
      ];

      const result = await runQuery(query, params);

      // Auto-create default Admin user for the new company
      try {
        const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';
        const currentYearId = await getCurrentFinancialYearId();
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        
        const adminQuery = `
          INSERT INTO mst_users
          (username, password, full_name, role_level, companyid, yearid, status, created_date)
          VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `;
        const adminParams = ['admin', hashedPassword, 'Company Admin', 'admin', result.id, currentYearId, 1];

        await runQuery(adminQuery, adminParams);
        console.log(`Default admin user created for company ID: ${result.id} with year ID: ${currentYearId}`);
      } catch (adminErr) {
        console.error('Error creating default admin user:', adminErr);
        // Don't fail the company creation if admin creation fails
      }

      res.json({ success: true, id: result.id });

    } catch (err) {
      console.error('Error in createCompany:', err, 'Received data:', req.body);
      res.status(500).json({ error: err.message || 'An unknown error occurred during company creation.' });
    }
  },

  // ------------------------------------
  // UPDATE COMPANY
  // ------------------------------------
  updateCompany: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const preparedData = prepareCompanyData(data);

      // Fetch existing logo filename to delete old file if new one is uploaded
      let existingLogo = null;
      if (req.file) {
        const existing = await getAll("SELECT companylogo FROM companymaster WHERE companyid = ?", [id]);
        existingLogo = existing[0]?.companylogo ? path.basename(existing[0].companylogo) : null;
      }

      // If no new file uploaded, fetch existing logo to preserve it
      let companyLogo = req.file ? req.file.filename : null;
      if (!req.file) {
        const existing = await getAll("SELECT companylogo FROM companymaster WHERE companyid = ?", [id]);
        companyLogo = existing[0]?.companylogo || null;
      }

      const query = `
        UPDATE companymaster SET
        company_title = ?, company_name = ?, company_address = ?, mobile1 = ?, mobile2 = ?, Name1 = ?, Name2 = ?, stateid = ?, cityid = ?,
        email = ?, website = ?, sales_tax_no = ?, shop_act_no = ?, pan_no = ?, it_ward = ?,
        shop_act_renewal_date = ?, gst_in_no = ?, is_aavak_req = ?, dalali = ?, hamali = ?, vatav = ?,
        commission = ?, item_readonly = ?, katala_readonly = ?, status = ?, updated_date = CURRENT_TIMESTAMP, companylogo = ?, yearid = ?
        WHERE companyid = ?
      `;

      const params = [
        preparedData.company_title || '', preparedData.company_name, preparedData.company_address, preparedData.mobile1, preparedData.mobile2 || null,
        preparedData.Name1 || '', preparedData.Name2 || '', preparedData.stateid,
        preparedData.cityid, preparedData.email || '', preparedData.website || '', preparedData.sales_tax_no || '', preparedData.shop_act_no || '',
        preparedData.pan_no || '', preparedData.it_ward || '', preparedData.shop_act_renewal_date || '', preparedData.gst_in_no || '',
        preparedData.is_aavak_req, preparedData.dalali, preparedData.hamali, preparedData.vatav, preparedData.commission, preparedData.item_readonly, preparedData.katala_readonly, preparedData.status, companyLogo, preparedData.yearid, id
      ];

      const result = await runQuery(query, params);

      // Delete old logo file if new one was uploaded
      if (req.file && existingLogo) {
        deleteOldLogo(existingLogo);
      }

      res.json({ success: true, changes: result.changes });

    } catch (err) {
      console.error('Error in updateCompany:', err);
      res.status(500).json({ error: err.message });
    }
  },

  // ------------------------------------
  // DELETE COMPANY
  // ------------------------------------
  deleteCompany: async (req, res) => {
    try {
      const id = req.params.id;

      // Fetch existing logo filename to delete file
      const existing = await getAll("SELECT companylogo FROM companymaster WHERE companyid = ?", [id]);
      const existingLogo = existing[0]?.companylogo ? path.basename(existing[0].companylogo) : null;

      await runQuery("DELETE FROM companymaster WHERE companyid = ?", [id]);

      // Delete logo file
      if (existingLogo) {
        deleteOldLogo(existingLogo);
      }

      res.json({ success: true });

    } catch (err) {
      console.error('Error in deleteCompany:', err);
      res.status(500).json({ error: err.message });
    }
  },

  // ------------------------------------
  // GET COMPANY BY ID (Internal Function)
  // ------------------------------------
  getCompanyById: async (companyid) => {
    try {
      const rows = await getAll(
        `SELECT * FROM companymaster WHERE companyid = ?`,
        [companyid]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error in getCompanyById:', error);
      throw error;
    }
  },

  // ------------------------------------
  // GET COMPANY BY ID (API Route Handler)
  // ------------------------------------
  getCompanyByIdRoute: async (req, res) => {
    try {
      const { id } = req.params;
      const rows = await getAll(
        `SELECT * FROM companymaster WHERE companyid = ?`,
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Company not found' });
      }
      const company = rows[0];
      // Normalize companylogo to filename only
      if (company.companylogo) {
        company.companylogo = path.basename(company.companylogo);
      }
      res.json(company);
    } catch (error) {
      console.error('Error in getCompanyByIdRoute:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // TEST DB CONNECTION
  // ------------------------------------
  testDbConnection: async (req, res) => {
    try {
      // Simple query to test DB connection
      await getAll('SELECT 1');
      res.json({ success: true, message: 'Database connection is OK!' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
