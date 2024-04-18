export {};
const express = require('express');
const conversationController = require('../controller/conversationController');
const router = express.Router();
router.post('/addConversation', conversationController.addConversation);
module.exports = router;
