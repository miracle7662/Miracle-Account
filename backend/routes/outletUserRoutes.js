const express = require('express');
const router = express.Router();
const outletUserController = require('../controllers/outletUserController');

// Get outlet users (filtered by role)
router.get('/', outletUserController.getOutletUsers);

// Get hotel admins specifically
router.get('/hotel-admins', outletUserController.getHotelAdmins);

// Get outlets for dropdown (filtered by role)
router.get('/outlets-dropdown', outletUserController.getOutletsForDropdown); // Changed from /outlets

// Get designations for dropdown
router.get('/designations', outletUserController.getDesignations);

// Get user types for dropdown
router.get('/user-types', outletUserController.getUserTypes);

// Get hotel admin by ID (must come before /:id route)
router.get('/hotel-admin/:id', outletUserController.getHotelAdminById);

// Get outlet user by ID
router.get('/:id', outletUserController.getOutletUserById);

// Create new outlet user
router.post('/', outletUserController.createOutletUser);

// Update hotel admin (must come before /:id route)
router.put('/hotel-admin/:id', outletUserController.updateHotelAdmin);

// Update outlet user
router.put('/:id', outletUserController.updateOutletUser);

// Delete outlet user (soft delete)
router.delete('/:id', outletUserController.deleteOutletUser);

module.exports = router; 