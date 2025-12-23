const express = require('express');
const router = express.Router();
const controller = require('../controllers/countryController');
const { authenticateToken } = require('../controllers/authController');
const companyFilter = require('../middlewares/companyFilter');

// All routes require authentication and company filtering
router.get('/', authenticateToken, companyFilter, controller.getCountries);
router.post('/', authenticateToken, companyFilter, controller.addCountry);
router.put('/:id', authenticateToken, companyFilter, controller.updateCountry);
router.delete('/:id', authenticateToken, companyFilter, controller.deleteCountry);

module.exports = router;
