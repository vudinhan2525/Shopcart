export {};
const express = require('express');
const authController = require('../controller/authController');
const prodController = require('../controller/prodController');
const router = express.Router();
router.get('/getProdType', prodController.getProdType);
router.get('/', prodController.getAllProd);
router.get('/:id', prodController.getProd);
router.post('/', prodController.addProd);
router.post(
    '/deleteProdFromUserList/:id',
    prodController.deleteProdFromUserList,
);
router.post('/getRelatedProd', prodController.getRelatedProd);
router.patch('/:id', prodController.upLoad, prodController.updateProd);
module.exports = router;
