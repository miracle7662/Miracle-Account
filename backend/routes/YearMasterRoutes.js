const express = require('express');
const router = express.Router();
const yearMasterController = require('../controllers/YearMasterController');
const { authenticateToken } = require('../controllers/authController');

// Get all years
router.get('/', yearMasterController.getYears);

// Get year by user selected yearid
router.get('/user-year', authenticateToken, yearMasterController.getYearByUser);

// Create new year
router.post('/', yearMasterController.createYear);

// Update year
router.put('/:id', yearMasterController.updateYear);

// Delete year
router.delete('/:id', yearMasterController.deleteYear);

module.exports = router;
