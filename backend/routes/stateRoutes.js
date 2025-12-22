const express = require('express');
const router = express.Router();
const controller = require('../controllers/stateController');
const { authenticateToken } = require('../controllers/authController');
const companyFilter = require('../middlewares/companyFilter');

// All routes require authentication and company filtering
router.get('/', authenticateToken, companyFilter, controller.getStates);
router.post('/', authenticateToken, companyFilter, controller.addState);
router.put('/:id', authenticateToken, companyFilter, controller.updateState);
router.delete('/:id', authenticateToken, companyFilter, controller.deleteState);

module.exports = router;
