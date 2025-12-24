const express = require('express');
const router = express.Router();
const controller = require('../controllers/ItemMainGroupController');

router.get('/', controller.getItemMainGroup);
router.post('/', controller.addItemMainGroup);
router.put('/:id', controller.updateItemMainGroup);
router.delete('/:id', controller.deleteItemMainGroup);

module.exports = router;