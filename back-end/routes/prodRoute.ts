export {};
const express = require('express');
const authController = require('../controller/authController');
const prodController = require('../controller/prodController');
const router = express.Router();
router.get('/countProd', prodController.countProd);
router.get('/', prodController.getAllProd);
router.get('/:id', prodController.getProd);
router.post('/getProdType', prodController.getProdType);
router.post('/', prodController.addProd);
router.post(
    '/deleteProdFromUserList/:id',
    prodController.deleteProdFromUserList,
);
router.post('/getRelatedProd', prodController.getRelatedProd);
router.post('/getProdInArray', prodController.getProdInArray);

router.patch('/:id', prodController.upLoad, prodController.updateProd);
module.exports = router;
