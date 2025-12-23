const express = require('express');
const router = express.Router();
const backupRestoreController = require('../controllers/backupRestoreController');

// Backup database
router.post('/backup', backupRestoreController.backupDatabase);

// Restore database
router.post('/restore', backupRestoreController.restoreDatabase);

// Get database info
router.get('/info', backupRestoreController.getDatabaseInfo);

module.exports = router;
