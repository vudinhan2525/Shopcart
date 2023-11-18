export {};
const express = require('express');
const authController = require('../controller/authController');
const shopController = require('../controller/shopController');
const router = express.Router();
router.get('/', shopController.getAllShop);
router.get('/:id', shopController.getShop);
router.post('/', shopController.addShop);
module.exports = router;
