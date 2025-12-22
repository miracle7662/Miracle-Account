const express = require('express');
const router = express.Router();
const controller = require('../controllers/Warehousecontroller');

router.get('/', controller.getwarehouse);
router.post('/', controller.addwarehouse);
router.put('/:id', controller.updatewarehouse);
router.delete('/:id', controller.deletewarehouse);

module.exports = router;