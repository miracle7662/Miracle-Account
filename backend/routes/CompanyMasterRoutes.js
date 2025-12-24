const express = require('express');
const router = express.Router();
const controller = require('../controllers/CompanyMasterController');

router.get('/', controller.getCompanies);
router.get('/:id', controller.getCompanyByIdRoute);
router.post('/', controller.upload.single('companylogo'), controller.createCompany);
router.put('/:id', controller.upload.single('companylogo'), controller.updateCompany);
router.delete('/:id', controller.deleteCompany);

module.exports = router;

