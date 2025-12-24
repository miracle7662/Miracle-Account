const express = require('express');
const router = express.Router();
const soudaController = require('../controllers/SoudaController');

router.get("/nextNo", soudaController.getNextSoudaNoHandler);
router.get("/generate-bill-data", soudaController.generateBillData);
router.get("/items/customer/:customerNo/:date", soudaController.getSoudaItemsByCustomer);
router.get("/first-date/customer/:customerNo", soudaController.getFirstSoudaDateForCustomer);
router.get("/items/farmer/:farmerNo", soudaController.getSoudaItemsByFarmer);

router.post("/", soudaController.createSouda);
router.get("/", soudaController.getAllSouda);
router.get("/:id", soudaController.getSoudaById);
router.put("/:id", soudaController.updateSouda);
router.delete("/:id", soudaController.deleteSouda);

module.exports = router;
