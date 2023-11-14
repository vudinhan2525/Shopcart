export {};
const express = require('express');
const authController = require('../controller/authController');
const prodController = require('../controller/prodController');
const router = express.Router();
router.get('/', prodController.getAllProd);
router.post('/', prodController.addProd);
module.exports = router;