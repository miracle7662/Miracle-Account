const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProductsController');

// ------------------------------
// PRODUCTS CRUD
// ------------------------------
router.get('/', controller.getProducts);        // Get all products
router.post('/', controller.addProduct);        // Add product
router.put('/:id', controller.updateProduct);   // Update by ID
router.delete('/:id', controller.deleteProduct); // Delete by ID

// ------------------------------
// SUPPORTING MASTER LISTS
// ------------------------------
router.get('/main-groups', controller.getMainGroups); // Item main groups
router.get('/units', controller.getUnits);            // Units list

module.exports = router;
