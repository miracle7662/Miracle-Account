const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

// Ensure ELECTRON_USER_DATA_PATH is set (fallback for dev mode)
if (!process.env.ELECTRON_USER_DATA_PATH) {
  process.env.ELECTRON_USER_DATA_PATH = path.join(process.cwd(), 'backend', 'userData');
}

// Determine uploads path based on environment (unified to use only ELECTRON_USER_DATA_PATH)


const getUploadsPath = () => {

  return path.join(process.env.ELECTRON_USER_DATA_PATH, 'uploads');
}; 
  
const db = require('./config/db.js');
const countryRoutes = require('./routes/countryRoutes');
const stateRoutes = require('./routes/stateRoutes');
const cityRoutes = require('./routes/cityRoutes');



const HotelMastersRoutes = require('./routes/HotelMastersRoutes');
const ItemMainGroupRoutes = require('./routes/ItemMainGroupRoutes');


// const outletRoutes = require('./routes/outletRoutes');
// const outletUserRoutes = require('./routes/outletUserRoutes');
// const timezoneRoutes = require('./routes/timezoneRoutes');
// const timeRoutes = require('./routes/timeRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const authController = require('./controllers/authController');

// Import middlewares
const { authenticateToken } = authController;
const companyFilter = require('./middlewares/companyFilter');


const productsRoutes = require('./routes/productsRoutes');
const MandiLedgerRoutes = require('./routes/MandiLedgerRoutes');
const LedgerAccountRoutes = require('./routes/LedgerAccountRoutes');
const AccountNatureRoutes = require('./routes/AccountNatureRoutes');
const AccountTypeRoutes = require('./routes/AccountTypeRoutes');  // New import
const SoudaRoutes = require('./routes/SoudaRoutes');
const CashBookRoutes = require('./routes/CashBookRoutes');
const customerBillRoutes = require("./routes/CustomerBillRoutes");
const FarmerBillRoutes = require("./routes/FarmerBillRoutes");
const PLReportRoutes = require("./routes/PLReportRoutes");
const CompanyMasterRoutes = require("./routes/CompanyMasterRoutes");
const YearMasterRoutes = require("./routes/YearMasterRoutes");
const CompanyMasterController = require('./controllers/CompanyMasterController');
const backupRestoreRoutes = require('./routes/backupRestoreRoutes');
const { initializeWhatsApp } = require('./controllers/WhatsAppController');
const mstuserRoutes = require("./routes/mstuserRoutes");
const DashboardController = require('./controllers/DashboardController');
const DayEndController = require('./controllers/DayEndController');

console.log('CustomerBillRoutes loaded:', typeof customerBillRoutes);

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from uploads directory (company logos)
const getCompanyLogosPath = () => {
  return path.join(process.env.ELECTRON_USER_DATA_PATH, 'uploads', 'company_logos');
};

app.use('/uploads/company_logos', express.static(getCompanyLogosPath()));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Apply authentication and company filter middleware to all routes except auth and public endpoints
app.use('/api', async (req, res, next) => {
  // Skip middleware for auth routes
  if (req.path.startsWith('/auth')) {
    return next();
  }
  
  // Allow unauthenticated GET requests to companymaster and yearmaster (needed for login page)
  // Pattern: /companymaster or /companymaster/:id (numeric ID)
  if ((req.path === '/companymaster' || /^\/companymaster\/\d+$/.test(req.path) || req.path === '/yearmaster') && req.method === 'GET') {
    return next();
  }
  
  // Apply authentication and company filter for all other routes
  authenticateToken(req, res, async (err) => {
    if (err) return next(err);
    try {
      await companyFilter(req, res, next);
    } catch (error) {
      next(error);
    }
  });
});

app.use('/api/countries', countryRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/cities', cityRoutes);


app.use('/api/HotelMasters', HotelMastersRoutes);
app.use('/api/ItemMainGroup', ItemMainGroupRoutes);

// app.use('/api/outlets', outletRoutes);
// app.use('/api/outlet-users', outletUserRoutes);
// app.use('/api/timezones', timezoneRoutes);
// app.use('/api/times', timeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);




app.use('/api/products', productsRoutes);
app.use('/api/mandi-ledger', MandiLedgerRoutes);
app.use('/api/ledger-account', LedgerAccountRoutes);

app.use('/api/accountnature', AccountNatureRoutes);
app.use('/api/accounttype', AccountTypeRoutes);  // New route registration

app.use('/api/souda', SoudaRoutes);
app.use('/api/cashbook', CashBookRoutes);
app.use('/api/pl-report', PLReportRoutes);
app.use("/api/customerbill", customerBillRoutes);
app.use("/api/farmerbill", FarmerBillRoutes);
app.use("/api/companymaster", CompanyMasterRoutes);
app.use("/api/yearmaster", YearMasterRoutes);
app.use('/api/backup-restore', backupRestoreRoutes);
app.use("/api/mstuser", mstuserRoutes);

// Dashboard routes
app.get('/api/dashboard/overview', DashboardController.getOverview);

// DayEnd routes
app.get('/api/dayend/latest-currdate', DayEndController.getLatestCurrDate);

// Test route
app.get('/api/customerbill/test', (req, res) => {
  res.json({ test: 'customerbill routes working' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', cors: 'enabled' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  console.error('Stack trace:', err.stack);
  console.error('Request URL:', req.url);
  console.error('Request method:', req.method);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(port, async () => {
      console.log(`Server running at http://localhost:${port}`);
    // Initialize WhatsApp client
    initializeWhatsApp();

     // Run logo path migration
    try {
        await CompanyMasterController.migrateLogoPaths();
        console.log('Logo path migration completed successfully');
    } catch (error) {
        console.error('Error during logo path migration:', error);
    }
});
