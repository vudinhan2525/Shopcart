export {};
const express = require('express');
const billController = require('../controller/billController');
const router = express.Router();
router.get('/:userId', billController.getAllBill);
router.post('/addBill/:userId', billController.addBill);
module.exports = router;
