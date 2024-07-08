export {};
const express = require('express');
const billController = require('../controller/billController');
const router = express.Router();
router.get('/:userId', billController.getAllBill);
router.post('/getStripe', billController.getStripe);
// router.post(
//     '/successStripe',
//     express.raw({ type: 'application/json' }),
//     billController.successStripe,
// );
router.post('/addBill/:userId', billController.addBill);
module.exports = router;
