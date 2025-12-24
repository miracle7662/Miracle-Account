const express = require("express");
const router = express.Router();
const controller = require("../controllers/MandiLedgerController");

// Page 1 → Customers (Debtors)
router.get("/customers", controller.getCustomers);
router.get("/sodacustomer", controller.getsodacustomer);

// Page 2 → Farmers (Creditors)
router.get("/farmers", controller.getFarmers);

// Page 3 → Ledger (All)
router.get("/ledger", controller.getLedger);

// CRUD
router.post("/", controller.createLedger);
router.put("/:id", controller.updateLedger);
router.delete("/:id", controller.deleteLedger);

// Test DB connection route
router.get("/test-db", controller.testDbConnection);

router.get("/cashbank", controller.getCashBankLedgers);
router.get("/oppbank", controller.getOppBankList);
router.get("/customer/:customerNo", controller.getCustomerByNo);
router.get("/farmer/:farmerNo", controller.getFarmerByNo);
router.get("/outstanding", controller.getOutstandingCustomersAndFarmers);

module.exports = router;
