export {};
const express = require('express');
const billController = require('../controller/billController');
const router = express.Router();
router.post(
    '/successStripe',
    express.raw({ type: 'application/json' }),
    billController.successStripe,
);
module.exports = router;
