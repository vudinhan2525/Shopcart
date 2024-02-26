export {};
const express = require('express');
const ratingController = require('../controller/ratingController');
const router = express.Router();
router.get('/', ratingController.getAllRating);
router.post('/', ratingController.upLoad, ratingController.addRating);
router.get('/:idProd', ratingController.getRatingProd);
router.patch(
    '/updateRating/:id',
    ratingController.upLoad,
    ratingController.updateRating,
);
module.exports = router;
