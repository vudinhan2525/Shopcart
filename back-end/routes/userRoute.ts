const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.use(authController.protect);
router.post('/updatePassword', authController.updatePassword);
router.get('/', userController.getAllUser);
router.get('/:id', userController.getOneUser);
router.post('/', userController.addUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
module.exports = router;
