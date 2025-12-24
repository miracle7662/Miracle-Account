const express = require('express');
const router = express.Router();
const controller = require('../controllers/LedgerAccount');

// Get ledger accounts by type (customer, farmer, all)
router.get('/:type', controller.getLedgerAccounts);

// Get cashbook entries for a ledger
router.get('/:ledgerId/cashbook', controller.getCashBook);

// Get receipts and payments for a ledger
router.get('/:ledgerId/receipts-payments', controller.getReceiptsPayments);

// Get customer bills for a ledger
router.get('/:ledgerId/customer-bills', controller.getCustomerBills);

// Get farmer bills for a ledger
router.get('/:ledgerId/farmer-bills', controller.getFarmerBills);

// Get debit/credit entries for a ledger
router.get('/:ledgerId/debit-credit', controller.getDebitCreditEntries);

// Get opening balance for a ledger
router.get('/:ledgerId/opening-balance', controller.getOpeningBalance);

// Get unified ledger statement for a ledger
router.get('/:ledgerId/statement', controller.getLedgerStatement);

// Get unified ledger statement for farmer ledger
router.get('/:ledgerId/statement-farmer', controller.getLedgerStatementFarmer);

// Create new ledger account
router.post('/', controller.createLedgerAccount);

// Update ledger account
router.put('/:id', controller.updateLedgerAccount);

// Delete ledger account
router.delete('/:id', controller.deleteLedgerAccount);

module.exports = router;
