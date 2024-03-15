export {};
const express = require('express');
const authController = require('../controller/authController');
const prodController = require('../controller/prodController');
const router = express.Router();
router.get('/countProd', prodController.countProd);
router.get('/', prodController.getAllProd);
router.get('/:id', prodController.getProd);
router.post('/getProdType', prodController.getProdType);

router.post(
    '/deleteProdFromUserList/:id',
    prodController.deleteProdFromUserList,
);
router.post('/getRelatedProd', prodController.getRelatedProd);
router.post('/getProdInArray', prodController.getProdInArray);

router.use(authController.protect);
router.delete('/:id', prodController.deleteProd);
router.patch('/:id', prodController.upLoad, prodController.updateProd);
router.post('/', prodController.upLoad, prodController.addProd);
module.exports = router;
