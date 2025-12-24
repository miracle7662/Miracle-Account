const express = require('express');
const router = express.Router();
const outletController = require('../controllers/outletController');

router.get('/brands', outletController.getBrands);

// Get all outlets
router.get('/', outletController.getOutlets);

// Get outlet by ID
router.get('/:id', outletController.getOutletById);

// Add new outlet
router.post('/', outletController.addOutlet);

// Update outlet
router.put('/:id', outletController.updateOutlet);

// Delete outlet
router.delete('/:id', outletController.deleteOutlet);



router.get('/outlet-settings/:outletid', outletController.getOutletSettings);

// Update outlet settings
router.put('/outlet-settings/:outletid', outletController.updateOutletSettings);

// GET all Outlet Bill Settings for an outlet

// GET all settings for an outlet
router.get('/settings/:outletid',  outletController.getOutletBillingSettings);

// GET bill preview settings
router.get('/bill-preview-settings/:outletid', outletController.getBillPreviewSettings);
router.get('/bill-print-settings/:outletid', outletController.getBillPrintSettings);




// PUT update bill preview settings
router.put('/bill-preview-settings/:outletid', outletController.updateBillPreviewSettings);

// GET KOT print settings
router.get('/kot-print-settings/:outletid', outletController.getKotPrintSettings);

// PUT update KOT print settings
router.put('/kot-print-settings/:outletid', outletController.updateKotPrintSettings);


// PUT update bill print settings
router.put('/bill-print-settings/:outletid', outletController.updateBillPrintSettings);

// PUT update general settings
router.put('/general-settings/:outletid', outletController.updateGeneralSettings);

// PUT update online orders settings
router.put('/online-orders-settings/:outletid', outletController.updateOnlineOrdersSettings);






module.exports = router;
