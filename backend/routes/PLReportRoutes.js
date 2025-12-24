const express = require('express');
const router = express.Router();
const plReportController = require('../controllers/PLReportController');

router.get("/", plReportController.getPLReport);

module.exports = router;
