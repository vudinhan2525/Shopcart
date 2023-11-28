export {};
const express = require('express');
const addressController = require('../controller/addressController.ts');

const router = express.Router();
router.get('/', addressController.getAllAddress);
router.get('/:id', addressController.getOneAddress);
router.patch('/:id', addressController.updateAddress);
router.post('/', addressController.addAddress);
router.delete('/:id', addressController.deleteAddress);
router.post('/getUserAddress', addressController.getUserAddress);
module.exports = router;
