const express = require('express');
const router = express.Router();

const accountNatureController = require('../controllers/AccountNatureController');

// Get list of all Account Natures
router.get('/', accountNatureController.listAccountNatures);

// Get a single Account Nature by ID
router.get('/:id', accountNatureController.getAccountNatureById);

// Create a new Account Nature
router.post('/', accountNatureController.createAccountNature);

// Update an existing Account Nature by ID
router.put('/:id', accountNatureController.updateAccountNature);

// Delete an Account Nature by ID
router.delete('/:id', accountNatureController.deleteAccountNature);

module.exports = router;
