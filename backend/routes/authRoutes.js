const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

// Select company route
router.post('/select-company', authController.selectCompany);

// Select year route
router.post('/select-year', authController.selectYear);

// Get current user info
router.get('/me', authController.getCurrentUser);

// Verify password for F8 action on billed tables (current implementation)
router.post('/verify-f8-password', authController.verifyF8Password);

// Verify password of the user who created the bill for F8 action on billed tables
router.post('/verify-bill-creator-password', authController.verifyBillCreatorPassword);

// Verify password for handover access
router.post('/verify-password', authController.verifyPassword);

// Verify password of the user's creator (for F9 action)
router.post('/verify-creator-password', authController.verifyCreatorPassword);



module.exports = router;
