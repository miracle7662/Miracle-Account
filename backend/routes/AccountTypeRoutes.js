const express = require('express');
const router = express.Router();

const accountTypeController = require('../controllers/AccountTypeController');

// Get list of all Account Types
router.get('/', accountTypeController.listAccountTypes);

// Get a single Account Type by ID
router.get('/:id', accountTypeController.getAccountTypeById);

// Create a new Account Type
router.post('/', accountTypeController.createAccountType);

// Update an existing Account Type by ID
router.put('/:id', accountTypeController.updateAccountType);

// Delete an Account Type by ID
router.delete('/:id', accountTypeController.deleteAccountType);

module.exports = router;
