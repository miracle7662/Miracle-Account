// routes/FarmerBillRoutes.js
const express = require("express");
const router = express.Router();

const controller = require("../controllers/FarmerBillController");

// ----- Farmer Bill Header -----
router.post("/add", controller.createFarmerBill);
router.get("/", controller.getAllFarmerBills);
router.get("/nextNo", controller.getNextBillNo);
router.get("/last/:farmerID", controller.getLastBillForFarmer);
router.get("/date/:farmerID", controller.getFarmerBillDate);
router.get("/generate-bill-data/:farmerID", controller.generateFarmerBillData);
router.get("/:id", controller.getFarmerBillById);
router.put("/:id", controller.updateFarmerBill);
router.delete("/:id", controller.deleteFarmerBill);

// ----- Farmer Bill Details -----
router.post("/details/add", controller.createFarmerBillDetail);
router.delete("/details/:id", controller.deleteFarmerBillDetail);

module.exports = router;
