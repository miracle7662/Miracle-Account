const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'backend', 'database.sqlite');
const db = new Database(dbPath);

console.log('🚀 Initializing Miracle Account Database...');

try {
  // Create tables
  console.log('📋 Creating database tables...');

  // mst_users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS mst_users (
      userid INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT,
      password TEXT NOT NULL,
      full_name TEXT,
      role_level TEXT DEFAULT 'user',
      status INTEGER DEFAULT 1,
      created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME,
      companyid INTEGER,
      yearid INTEGER,
      brand_id INTEGER,
      hotelid INTEGER,
      outletid INTEGER,
      phone TEXT,
      created_by_id INTEGER
    )
  `);

  // companymaster table
  db.exec(`
    CREATE TABLE IF NOT EXISTS companymaster (
      companyid INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL,
      company_address TEXT,
      company_phone TEXT,
      company_email TEXT,
      company_logo TEXT,
      status INTEGER DEFAULT 1,
      created_date DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // yearmaster table
  db.exec(`
    CREATE TABLE IF NOT EXISTS yearmaster (
      yearid INTEGER PRIMARY KEY AUTOINCREMENT,
      Year INTEGER NOT NULL,
      status INTEGER DEFAULT 1,
      created_date DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert sample data
  console.log('📝 Inserting sample data...');

  // Insert companies
  const companies = [
    { name: 'Miracle Software Solutions', address: '123 Tech Street, Mumbai' },
    { name: 'Tally Accounting Services', address: '456 Business Ave, Delhi' },
    { name: 'QuickBooks India', address: '789 Finance Road, Bangalore' }
  ];

  const companyStmt = db.prepare(`
    INSERT OR IGNORE INTO companymaster (company_name, company_address, status)
    VALUES (?, ?, ?)
  `);

  companies.forEach(company => {
    companyStmt.run(company.name, company.address, 1);
  });

  // Insert years
  const years = [2023, 2024, 2025];
  const yearStmt = db.prepare(`
    INSERT OR IGNORE INTO yearmaster (Year, status)
    VALUES (?, ?)
  `);

  years.forEach(year => {
    yearStmt.run(year, 1);
  });

  // Create admin user for each company
  const userStmt = db.prepare(`
    INSERT OR IGNORE INTO mst_users (
      username, email, password, full_name, role_level, status, companyid, yearid
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Get company and year IDs
  const companyRows = db.prepare('SELECT companyid, company_name FROM companymaster').all();
  const yearRows = db.prepare('SELECT yearid, Year FROM yearmaster').all();

  if (companyRows.length > 0 && yearRows.length > 0) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);

    companyRows.forEach((company, index) => {
      const username = `admin${index + 1}`;
      const email = `${username}@miracle.com`;
      const fullName = `Administrator ${company.company_name.split(' ')[0]}`;

      userStmt.run(
        username,
        email,
        hashedPassword,
        fullName,
        'admin',
        1,
        company.companyid,
        yearRows[0].yearid // Default to first year (2024)
      );
    });
  }

  console.log('✅ Database initialized successfully!');
  console.log('📋 Created tables: mst_users, companymaster, yearmaster');
  console.log('👥 Sample users created:');
  console.log('   admin1@miracle.com / admin123 (Miracle Software Solutions)');
  console.log('   admin2@miracle.com / admin123 (Tally Accounting Services)');
  console.log('   admin3@miracle.com / admin123 (QuickBooks India)');
  console.log('📅 Years available: 2023, 2024, 2025');

} catch (error) {
  console.error('❌ Error initializing database:', error);
} finally {
  db.close();
}

console.log('🎉 Database initialization complete!');
process.exit(0);
