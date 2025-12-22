const express = require('express');
const router = express.Router();
const controller = require('../controllers/unitmasterController');

router.get('/', controller.getunitmaster);
router.post('/', controller.addunitmaster);
router.put('/:id', controller.updateunitmaster);
router.delete('/:id', controller.deleteunitmaster);

module.exports = router;
