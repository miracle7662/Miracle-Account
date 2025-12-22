const express = require('express');
const router = express.Router();
const timeController = require('../controllers/timeController');

// Get start times
router.get('/start-times', timeController.getStartTimes);

// Get close times
router.get('/close-times', timeController.getCloseTimes);

module.exports = router; 