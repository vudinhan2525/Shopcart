const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();
router.get('/users', userController.getAllUser);
router.post('/users', userController.addUser);
module.exports = router;
