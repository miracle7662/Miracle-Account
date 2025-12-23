const express = require('express');
const router = express.Router();
const controller = require('../controllers/cityController');
const { authenticateToken } = require('../controllers/authController');
const companyFilter = require('../middlewares/companyFilter');

// All routes require authentication and company filtering
router.get('/', authenticateToken, companyFilter, controller.getCities);
router.post('/', authenticateToken, companyFilter, controller.addCity);
router.put('/:id', authenticateToken, companyFilter, controller.updateCity);
router.delete('/:id', authenticateToken, companyFilter, controller.deleteCity);
// Get cities by state (also requires auth and company filter)
router.get('/:stateId', authenticateToken, companyFilter, controller.getCitiesByState);

module.exports = router;
