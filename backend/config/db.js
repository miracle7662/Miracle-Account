const path = require('path')
const Database = require('better-sqlite3')

// ✅ Connect to SQLite DB (creates file if not exist)
// const db = new Database(path.join(__dirname, 'miresto.db'));
//const db = new Database(path.join('F:','newmidb', 'newmidb.db'));

const db = new Database(path.join('D:','Restaurant_Database', 'dbmiracle.db')); 

//const db = new Database(path.join(__dirname, 'database.sqlite')) // Use relative path

//const db = new Database(path.join('E:', 'ReactHotelData', 'miresto.db'));

// ✅ Create tables (once)
db.exec(`
  CREATE TABLE IF NOT EXISTS mstcountrymaster (
    countryid INTEGER PRIMARY KEY AUTOINCREMENT,
    country_name TEXT NOT NULL,
    country_code TEXT NOT NULL,
    country_capital TEXT NOT NULL,
    status INTEGER DEFAULT 1,
    created_by_id INTEGER,
    created_date TEXT,
    updated_by_id INTEGER,
    updated_date TEXT,
   companyid INTEGER,
yearid INTEGER
  );
  CREATE TABLE IF NOT EXISTS mststatemaster (
    stateid INTEGER PRIMARY KEY AUTOINCREMENT,
    state_name TEXT NOT NULL,
    state_code TEXT NOT NULL,
    state_capital TEXT NOT NULL,
    countryid INTEGER,
    status INTEGER DEFAULT 1,
    created_by_id INTEGER,
    created_date TEXT,
    updated_by_id INTEGER,
    updated_date TEXT,
   companyid INTEGER,
yearid INTEGER
  );

  CREATE TABLE IF NOT EXISTS mstcitymaster (
    cityid INTEGER PRIMARY KEY AUTOINCREMENT,
    city_name TEXT NOT NULL,
    city_Code TEXT NOT NULL,
    stateId INTEGER,    
    iscoastal BOOLEAN DEFAULT 0,
    status INTEGER DEFAULT 1,
    created_by_id INTEGER,
    created_date TEXT,
    updated_by_id INTEGER,
    updated_date TEXT,
companyid INTEGER,
yearid INTEGER  
);
 
 CREATE TABLE IF NOT EXISTS mstunitmaster (
    unitid INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_name TEXT NOT NULL,        
    status INTEGER DEFAULT 1,
    created_by_id INTEGER,
    created_date TEXT,
    updated_by_id INTEGER,
    updated_date TEXT,
    hotelid INTEGER,
    client_code TEXT,
   companyid INTEGER,
   yearid INTEGER
);



CREATE TABLE IF NOT EXISTS mst_Item_Main_Group (
item_maingroupid INTEGER PRIMARY KEY AUTOINCREMENT,
item_group_name text(200),
status INTEGER ,
created_by_id INTEGER,
created_date DATETIME,
updated_by_id INTEGER,
updated_date DATETIME,
companyid INTEGER,
yearid INTEGER
);



-- New tables for hierarchical user management
CREATE TABLE IF NOT EXISTS mst_users (
    userid INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role_level TEXT NOT NULL, -- 'superadmin',  'admin', 'user'
    parent_user_id INTEGER, -- References the user who created this user
    Designation TEXT, -- Designation for outlet user
    designationid INTEGER, -- Designation ID for outlet user
    user_type TEXT, -- User type for outlet user     
    mac_address TEXT, -- MAC address for outlet user
    assign_warehouse TEXT, -- Assigned warehouse for outlet user
    language_preference TEXT DEFAULT 'English', -- Language preference for outlet user
    address TEXT, -- 
    city TEXT, --
    web_access INTEGER DEFAULT 0, -- Web access permission    
   
      usertypeid          INTEGER,
    status INTEGER,
    last_login DATETIME,
    created_by_id INTEGER,
    created_date DATETIME,
    updated_by_id INTEGER,
    updated_date DATETIME,
    companyid INTEGER,
yearid INTEGER
);







   CREATE TABLE IF NOT EXISTS products (
    product_id         INTEGER  PRIMARY KEY AUTOINCREMENT,
    product_nameeg       TEXT     NOT NULL,
    product_namemg       TEXT     NOT NULL,
    item_maingroupid  integer  NOT NULL,
                 
    unitid       integer  NOT NULL ,
    hsn_code text  NOT NULL,
    gstrate text  NOT NULL,
    description text  NOT NULL,
     status           INTEGER,
    created_by_id    INTEGER,
    created_date     DATETIME,
    updated_by_id    INTEGER,
    updated_date     DATETIME,
   companyid INTEGER,
yearid INTEGER
   
);

 CREATE TABLE IF NOT EXISTS accountnaturemaster (
    nature_id      INTEGER      PRIMARY KEY AUTOINCREMENT,
    accountnature TEXT (50)    NOT NULL,
    status           INTEGER,
    created_by_id    INTEGER,
    created_date     DATETIME,
    updated_by_id    INTEGER,
    updated_date     DATETIME,
  companyid INTEGER,
yearid INTEGER
  
);

 CREATE TABLE IF NOT EXISTS accounttypedetails (
    AccID        INTEGER       PRIMARY KEY AUTOINCREMENT,
    AccName      VARCHAR (200) NOT NULL,
    UnderID      INTEGER,
    NatureOfC    INTEGER,
    status           INTEGER,
    created_by_id    INTEGER,
    created_date     DATETIME,
    updated_by_id    INTEGER,
    updated_date     DATETIME,
 companyid INTEGER,
yearid INTEGER,
    FOREIGN KEY (
        NatureOfC
    )
    REFERENCES accountnaturemaster (nature_id)
);

 CREATE TABLE IF NOT EXISTS mandiledger (
    LedgerId           INTEGER         PRIMARY KEY AUTOINCREMENT,
    LedgerNo           INTEGER,
    CustomerNo         INTEGER   UNIQUE,
    FarmerNo           INTEGER   UNIQUE,
    Name               TEXT            NOT NULL,
    address            TEXT,
   stateid               INTEGER,
    cityid                INTEGER,
    MobileNo           TEXT,
    PhoneNo            TEXT,
    GstNo              TEXT,
    PanNo              TEXT,
    OpeningBalance     DECIMAL (12, 2) DEFAULT 0.0,
    OpeningBalanceDate DATE,
    AccountTypeId      INTEGER,
    AccountType        TEXT,
    Status             INTEGER         DEFAULT 1,
    createdbyid        INTEGER         DEFAULT 1,
    createdbydate      DATETIME        DEFAULT CURRENT_TIMESTAMP,
    updatedbyid        INTEGER,
    updatedbydate      DATETIME,
    companyid INTEGER,
    yearid INTEGER,
    FOREIGN KEY (
        AccountTypeId
    )
    REFERENCES accounttypedetails (AccID)
);

CREATE TABLE IF NOT EXISTS soudaheader (
    SoudaID          INTEGER         PRIMARY KEY AUTOINCREMENT,
    SoudaNo          VARCHAR (50)    NOT NULL,
    FarmerNo         INTEGER  ,       
    SoudaDate        DATE            NOT NULL,
    TotalItems       INTEGER         DEFAULT 0,
    TotalFarmerAmt   DECIMAL (12, 2) DEFAULT 0.0,
    TotalCustomerAmt DECIMAL (12, 2) DEFAULT 0.0,
    TotalKatala      DECIMAL (12, 2) DEFAULT 0.0,
    StatusCode       INTEGER         DEFAULT 1,
    Created_Date     DATETIME        DEFAULT CURRENT_TIMESTAMP,
    Created_by_id    INTEGER         DEFAULT 1,
    Updated_date     DATETIME,
    Updated_id       INTEGER ,
    companyid INTEGER,
yearid INTEGER,
    FOREIGN KEY (
        FarmerNo
    )
    REFERENCES mandiledger (FarmerNo)
);

CREATE TABLE IF NOT EXISTS soudaitemsdetails (
    ItemID         INTEGER         PRIMARY KEY AUTOINCREMENT,
    SoudaID        INTEGER         NOT NULL,
    FarmerNo       INTEGER         ,       
    CustomerNo     INTEGER         ,     
    ItemName       VARCHAR (200)   NOT NULL,
    Quantity       DECIMAL (10, 2) NOT NULL,
    FarmerAmount   DECIMAL (12, 2) NOT NULL,
    CustomerAmount DECIMAL (12, 2) NOT NULL,
    Katala         DECIMAL (12, 2) DEFAULT 0.0,
    StatusCode     INTEGER         DEFAULT 1,
    Created_Date   DATETIME        DEFAULT CURRENT_TIMESTAMP,
    Created_by_id  INTEGER         DEFAULT 1,
    Updated_date   DATETIME,
    Updated_id     INTEGER,
    CustomerName   VARCHAR (200)   DEFAULT '',
    IsBilled INTEGER ,
    FOREIGN KEY (
        SoudaID
    )
    REFERENCES soudaheader (SoudaID),
    FOREIGN KEY (
        FarmerNo
    )
    REFERENCES mandiledger (FarmerNo),
    FOREIGN KEY (
        CustomerNo
    )
    REFERENCES mandiledger (CustomerNo) 
);

CREATE TABLE IF NOT EXISTS customerbillheader (
    custBillID           INTEGER         PRIMARY KEY AUTOINCREMENT,
    custBillNumber       VARCHAR (50)    DEFAULT '',
    custBillDate         DATE            NOT NULL,
    SoudaID          INTEGER,
    CustomerID     INTEGER,
    CustomerName     VARCHAR (200)   NOT NULL,
    TotalItems       INTEGER         DEFAULT 0,
    TotalAmount      DECIMAL (9, 2)  DEFAULT 0,
    TotalDiscount    DECIMAL (9, 2)  DEFAULT 0,
    FinalTotalAmount DECIMAL (9, 2)  DEFAULT 0,   
    PreviousBalance  DECIMAL (12, 2) DEFAULT 0.0,
    PreviousAdvance  DECIMAL (12, 2) DEFAULT 0.0,
    Discount         DECIMAL (12, 2) DEFAULT 0.0,
    katalaAmount        DECIMAL (12, 2) DEFAULT 0.0,
    TotalExpense     DECIMAL (12, 2) DEFAULT 0.0,
    FinalBillAmount  DECIMAL (12, 2) DEFAULT 0.0,
    DepositCash      DECIMAL (12, 2) DEFAULT 0.0,
    TransportCharges  DECIMAL (12, 2) DEFAULT 0.0,
    StatusCode       INTEGER         DEFAULT 1,
    Created_Date     DATETIME        DEFAULT CURRENT_TIMESTAMP,
    Created_by_id    INTEGER         DEFAULT 1,
    Updated_date     DATETIME,
    Updated_id       INTEGER,
    companyid INTEGER,
yearid INTEGER,
    FOREIGN KEY (
        SoudaID
    )
    REFERENCES soudaheader (SoudaID)
);

CREATE TABLE IF NOT EXISTS customerbillitems (
    ItemID        INTEGER        PRIMARY KEY AUTOINCREMENT,
    custBillID        INTEGER        NOT NULL,
      FarmerID INTEGER,
    FarmerName    VARCHAR (200)   NOT NULL,
    ItemName      VARCHAR (200)  NOT NULL,
    Quantity      DECIMAL (9, 2) DEFAULT 0,
   FarmerAmount   DECIMAL (12, 2) NOT NULL,
    CustomerAmount DECIMAL (12, 2) NOT NULL,
    Discount      DECIMAL (9, 2) DEFAULT 0,
    FinalAmount   DECIMAL (9, 2) DEFAULT 0,
    StatusCode    INTEGER        DEFAULT 1,
    Created_Date  DATETIME       DEFAULT CURRENT_TIMESTAMP,
    Created_by_id INTEGER        DEFAULT 1,
    Updated_date  DATETIME,
    Updated_id    INTEGER,
    FOREIGN KEY (
        custBillID
    )
    REFERENCES customerbillheader (custBillID)
);

CREATE TABLE IF NOT EXISTS FarmerBill (
    farBillID              INTEGER         PRIMARY KEY AUTOINCREMENT,
    farBillNumber          VARCHAR (50)    NOT NULL
                                        UNIQUE,                        
    farfromDate            DATE            NOT NULL,
    fartoDate            DATE            NOT NULL,
    farBillDate       DATE            NOT NULL,
     FarmerID INTEGER,
    FarmerName          VARCHAR (200)   NOT NULL,
    TotalItems          INTEGER         DEFAULT 0,
    TotalAmount         DECIMAL (12, 2) DEFAULT 0.0,
    PreviousBalance     DECIMAL (12, 2) DEFAULT 0.0,
    PreviousAdvance     DECIMAL (12, 2) DEFAULT 0.0,
    PreviousBalanceDate DATE,
    commission           DECIMAL (12, 2) DEFAULT 0.0,
    Hamali              DECIMAL (12, 2) DEFAULT 0.0,
    Vatav               DECIMAL (12, 2) DEFAULT 0.0,
    KatalaAmount           DECIMAL (12, 2) DEFAULT 0.0,
    TransportCharges    DECIMAL (12, 2) DEFAULT 0.0,
    Discount            DECIMAL (12, 2) DEFAULT 0.0,
    TotalExpense        DECIMAL (12, 2) DEFAULT 0.0,
    FinalBillAmount     DECIMAL (12, 2) DEFAULT 0.0,
    StatusCode          INTEGER         DEFAULT 1,
    Created_Date        DATETIME        DEFAULT CURRENT_TIMESTAMP,
    Created_by_id       INTEGER         DEFAULT 1,
    Updated_date        DATETIME,
    Updated_id          INTEGER,
companyid INTEGER,
yearid INTEGER
);

CREATE TABLE IF NOT EXISTS FarmerBillDetails (
    DetailID      INTEGER         PRIMARY KEY AUTOINCREMENT,
    farBillID        INTEGER         NOT NULL,
    SoudaID         INTEGER,
    CustomerID     INTEGER,
    CustomerName    VARCHAR (200)   NOT NULL,
    ItemName      VARCHAR (200)   NOT NULL,
    Quantity      DECIMAL (10, 2) DEFAULT 0.0,
    FarmerAmount   DECIMAL (12, 2) NOT NULL,
    CustomerAmount DECIMAL (12, 2) NOT NULL,    
    Total         DECIMAL (12, 2) DEFAULT 0.0,
    StatusCode    INTEGER         DEFAULT 1,
    Created_Date  DATETIME        DEFAULT CURRENT_TIMESTAMP,
    Created_by_id INTEGER         DEFAULT 1,
    Updated_date  DATETIME,
    Updated_id    INTEGER,
    FOREIGN KEY (
        farBillID
    )
    REFERENCES FarmerBill (farBillID)
);


CREATE TABLE IF NOT EXISTS CashBook (
    CashBookID          INTEGER         PRIMARY KEY AUTOINCREMENT,
    TransactionDate DATE            NOT NULL,
    VoucherNumber   VARCHAR (50) ,
    TransactionType VARCHAR (20)    NOT NULL
                                    CHECK (TransactionType IN ('Receipt', 'Payment') ),
    PaymentMode     VARCHAR (20)    NOT NULL,
      
    CashBankID    VARCHAR (200),
    CashBankIDName VARCHAR (200),
    OppBankID INTEGER,
    OppBankIDName VARCHAR (200),
    Amount          DECIMAL (12, 2) NOT NULL,     
    Description     TEXT,    
    StatusCode      INTEGER         DEFAULT 1,
    Created_Date    DATETIME        DEFAULT CURRENT_TIMESTAMP,
    Created_by_id   INTEGER         DEFAULT 1,
    Updated_date    DATETIME,
    Updated_id      INTEGER,
    companyid INTEGER,
    yearid INTEGER
    
);

CREATE TABLE IF NOT EXISTS companymaster (
    company_title      TEXT,
    companyid             INTEGER         PRIMARY KEY AUTOINCREMENT,
    company_name          TEXT            NOT NULL,
    company_address       TEXT,
    Name1               TEXT,
    Name2               TEXT,
    mobile1               TEXT,
    mobile2               TEXT,
    stateid                 INTEGER,
    cityid                  INTEGER,
    email                 TEXT,
    website               TEXT,
    sales_tax_no          TEXT,
    shop_act_no           TEXT,
    pan_no                TEXT,
    it_ward               TEXT,
    shop_act_renewal_date DATE,
    gst_in_no             TEXT,
    is_aavak_req          INTEGER         DEFAULT 0,
    dalali                DECIMAL (10, 2) DEFAULT 0.0,
    hamali                DECIMAL (10, 2) DEFAULT 0.0,
    vatav                 DECIMAL (10, 2) DEFAULT 0.0,
    commission            DECIMAL (10, 2) DEFAULT 0.0,
    item_readonly         INTEGER         DEFAULT 0,
    katala_readonly       INTEGER         DEFAULT 0,
    status                INTEGER         DEFAULT 1,
    created_date          DATETIME        DEFAULT CURRENT_TIMESTAMP,
    updated_date          DATETIME,
    companylogo           TEXT,
    yearid INTEGER
);

 CREATE TABLE IF NOT EXISTS yearmaster (
            yearid INTEGER PRIMARY KEY,
            Year TEXT,
            Startdate TEXT,
            Enddate TEXT,
            status INTEGER
        )

 



`)


module.exports = db
