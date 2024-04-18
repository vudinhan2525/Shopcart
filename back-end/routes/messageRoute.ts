export {};
const express = require('express');
const messageController = require('../controller/messageController');

const router = express.Router();
router.post('/addMessage', messageController.addMessage);
module.exports = router;
