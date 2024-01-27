export {};
const express = require('express');
const couponController = require('../controller/couponController');
const router = express.Router();
router.post('/checkCoupon', couponController.checkCoupon);
router.post('/', couponController.addCoupon);
module.exports = router;
