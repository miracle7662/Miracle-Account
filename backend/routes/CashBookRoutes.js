const express = require('express');
const router = express.Router();
const cashBookController = require('../controllers/CashBookController');

router.post("/", cashBookController.createCashBook);
router.get("/", cashBookController.getAllCashBook);
router.get("/max-voucher-number", cashBookController.getMaxVoucherNumber);
router.get("/:id", cashBookController.getCashBookById);
router.put("/:id", cashBookController.updateCashBook);
router.delete("/:id", cashBookController.deleteCashBook);

module.exports = router;
