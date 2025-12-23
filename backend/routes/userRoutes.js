const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const otpController = require('../controllers/otpController');

// Get all users (filtered by role hierarchy)
router.get('/', userController.getUsers);

// Create new user
router.post('/', userController.createUser);

// Update user
router.put('/:userid', userController.updateUser);

// Delete user (soft delete)
router.delete('/:userid', userController.deleteUser);

// Get user permissions
router.get('/:userid/permissions', userController.getUserPermissions);

// Update user permissions
router.put('/:userid/permissions', userController.updateUserPermissions);

// Company assignment routes
router.post('/:userid/companies', userController.assignUserToCompany);
router.delete('/:userid/companies/:companyid', userController.removeUserFromCompany);
router.put('/:userid/companies/:companyid/role', userController.updateUserCompanyRole);
router.get('/:userid/companies', userController.getUserCompanyAssignments);

module.exports = router;
