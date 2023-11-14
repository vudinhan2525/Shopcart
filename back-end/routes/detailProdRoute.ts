export {};
const express = require('express');
const detailProdController = require('../controller/detailProdController');

const router = express.Router();
router.get('/:id', detailProdController.getDetailProd);
router.post('/', detailProdController.addDetailProd);
module.exports = router;
