export {};
const express = require('express');
const addressController = require('../controller/addressController.ts');

const router = express.Router();
router.get('/', addressController.getAllAddress);
router.get('/:id', addressController.getOneAddress);
router.post('/', addressController.addAddress);
router.post('/getUserAddress', addressController.getUserAddress);
module.exports = router;
