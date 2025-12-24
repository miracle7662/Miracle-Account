// CustomerBillController.js Routes Example using Express

const express = require('express');
const router = express.Router();
const CustomerBillController = require('../controllers/CustomerBillcontroller');

// CREATE Bill
router.post('/add', CustomerBillController.createBillHeader);

// GET Next Bill Number
router.get('/nextNo', CustomerBillController.getNextcustBillNumberHandler);


// GET All Bills
router.get('/list', CustomerBillController.getBillHeaders);

// GET Single Bill by ID
router.get('/:id', CustomerBillController.getBillHeaderById);


// UPDATE Bill
router.put('/:id', CustomerBillController.updateBillHeader);

// DELETE Bill
router.delete('/:id', CustomerBillController.deleteBillHeader);

// GET Last Bill for Customer before specific date
router.get('/last/:customerId/:billDate', CustomerBillController.getLastBillForCustomer);

// CHECK if Bill exists for Customer on specific date
router.get('/check/:customerId/:billDate', CustomerBillController.checkBillExists);

module.exports = router;

