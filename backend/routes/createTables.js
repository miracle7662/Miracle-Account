const Database = require('better-sqlite3');
const path = require('path');

// Connect to the database
const dbPath = path.join(__dirname, '..', 'config', 'database.sqlite');
const db = new Database(dbPath);

console.log('🔧 Creating basic tables...\n');

try {
    // Create mst_users table (without foreign keys)
    console.log('Creating mst_users table...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS mst_users (
            userid INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(50) UNIQUE,
            email VARCHAR(100) UNIQUE,
            password VARCHAR(255) NOT NULL,
            full_name VARCHAR(100) NOT NULL,
            phone VARCHAR(20),
            role_level VARCHAR(20) NOT NULL,
            brand_id INTEGER,
            hotel_id INTEGER,
            parent_user_id INTEGER,
            is_active INTEGER DEFAULT 1,
            last_login DATETIME,
            created_by_id INTEGER,
            created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_by_id INTEGER,
            updated_date DATETIME
        )
    `).run();

    // Create mst_user_permissions table (without foreign keys)
    console.log('Creating mst_user_permissions table...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS mst_user_permissions (
            permission_id INTEGER PRIMARY KEY AUTOINCREMENT,
            userid INTEGER NOT NULL,
            module_name VARCHAR(50) NOT NULL,
            can_view INTEGER DEFAULT 0,
            can_create INTEGER DEFAULT 0,
            can_edit INTEGER DEFAULT 0,
            can_delete INTEGER DEFAULT 0,
            created_by_id INTEGER,
            created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_by_id INTEGER,
            updated_date DATETIME
        )
    `).run();

    // Create mandiledger table
    console.log('Creating mandiledger table...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS mandiledger (
            LedgerId INTEGER PRIMARY KEY AUTOINCREMENT,
            LedgerNo TEXT,
            CustomerNo TEXT,
            FarmerNo TEXT,
            Name TEXT NOT NULL,
            MarathiName TEXT,
            address TEXT,
            state_id TEXT,
            cityid TEXT,
            MobileNo TEXT,
            PhoneNo TEXT,
            GstNo TEXT,
            PanNo TEXT,
            OpeningBalance REAL DEFAULT 0,
            OpeningBalanceDate TEXT,
            AccountTypeId TEXT,
            AccountType TEXT,
            Status INTEGER DEFAULT 1,
            createdbyid INTEGER,
            created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedbyid INTEGER,
            updated_date DATETIME
        )
    `).run();

    // Add MarathiName column to mandiledger if it doesn't exist
    console.log('Adding MarathiName column to mandiledger table...');
    try {
      db.prepare(`ALTER TABLE mandiledger ADD COLUMN MarathiName TEXT`).run();
      console.log('✅ MarathiName column added successfully!');
    } catch (error) {
      if (error.message.includes('duplicate column name')) {
        console.log('ℹ️ MarathiName column already exists.');
      } else {
        console.error('❌ Error adding MarathiName column:', error);
      }
    }

    // Create soudaheader table
    console.log('Creating soudaheader table...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS soudaheader (
            SoudaID INTEGER PRIMARY KEY AUTOINCREMENT,
            SoudaNo TEXT UNIQUE,
            FarmerNo TEXT,
            SoudaDate TEXT,
            TotalItems INTEGER,
            TotalFarmerAmt REAL,
            TotalCustomerAmt REAL,
            TotalKatala REAL,
            Created_by_id INTEGER,
            created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_date DATETIME
        )
    `).run();

    // Create soudaitemsdetails table
    console.log('Creating soudaitemsdetails table...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS soudaitemsdetails (
            SoudaItemID INTEGER PRIMARY KEY AUTOINCREMENT,
            SoudaID INTEGER,
            FarmerNo TEXT,
            CustomerNo TEXT,
            ItemName TEXT,
            Quantity REAL,
            FarmerAmount REAL,
            CustomerAmount REAL,
            Katala REAL,
            CustomerName TEXT,
            created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (SoudaID) REFERENCES soudaheader(SoudaID)
        )
    `).run();

    // Create FarmerBill table
    console.log('Creating FarmerBill table...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS FarmerBill (
            farBillID INTEGER PRIMARY KEY AUTOINCREMENT,
            farBillNumber TEXT UNIQUE,
            farfromDate TEXT,
            fartoDate TEXT,
            farBillDate TEXT,
            FarmerID INTEGER,
            FarmerName TEXT,
            TotalItems INTEGER,
            TotalAmount REAL,
            PreviousBalance REAL,
            PreviousAdvance REAL,
            PreviousBalanceDate TEXT,
            commission REAL,
            Hamali REAL,
            Vatav REAL,
            KatalaAmount REAL,
            TransportCharges REAL,
            Discount REAL,
            TotalExpense REAL,
            FinalBillAmount REAL,
            StatusCode INTEGER DEFAULT 1,
            Created_by_id INTEGER,
            created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            Updated_date DATETIME
        )
    `).run();

    // Create FarmerBillDetails table
    console.log('Creating FarmerBillDetails table...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS FarmerBillDetails (
            DetailID INTEGER PRIMARY KEY AUTOINCREMENT,
            farBillID INTEGER,
            SoudaID INTEGER,
            SoudaNo TEXT,
            SoudaDate TEXT,
            CustomerID INTEGER,
            CustomerName TEXT,
            ItemName TEXT,
            Quantity REAL,
            FarmerAmount REAL,
            CustomerAmount REAL,
            Katala REAL,
            Total REAL,
            StatusCode INTEGER DEFAULT 1,
            Created_by_id INTEGER,
            created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (farBillID) REFERENCES FarmerBill(farBillID)
        )
    `).run();

    // Create yearmaster table
    console.log('Creating yearmaster table...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS yearmaster (
            yearid INTEGER PRIMARY KEY,
            Year TEXT,
            Startdate TEXT,
            Enddate TEXT,
            status INTEGER
        )
    `).run();

    console.log('✅ Tables created successfully!');

} catch (error) {
    console.error('❌ Error creating tables:', error);
} finally {
    db.close();
}
