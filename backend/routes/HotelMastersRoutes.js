const express = require('express');
const router = express.Router();
const controller = require('../controllers/HotelMastersController');

router.get('/', controller.getHotelMasters);
router.get('/:id', controller.getHotelMastersById);
router.post('/', controller.addHotelMasters);
router.put('/:id', controller.updateHotelMasters);
router.delete('/:id', controller.deleteHotelMasters); 

module.exports = router;
