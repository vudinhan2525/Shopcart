export {};
const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/signup', authController.signup);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/isLoggedIn', authController.isLoggedIn);

router.use(authController.protect);
router.post('/updatePassword', authController.updatePassword);
router.get('/', userController.getAllUser);
router.get('/me', userController.getMe, userController.getOneUser);
router.get('/:id', userController.getOneUser);
router.post('/', userController.addUser);
router.post('/updateImage', userController.upLoad, userController.updateImage);
router.post('/changePassword', userController.changePassword);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
module.exports = router;
