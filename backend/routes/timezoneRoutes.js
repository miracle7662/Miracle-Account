const express = require('express');
const router = express.Router();
const timezoneController = require('../controllers/timezoneController');

// Get all timezones
router.get('/', timezoneController.getTimezones);

module.exports = router; 