import catchAsync from '../utils/catchAsync';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
const User = require('../models/userModel');
exports.addUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    console.log(req.body);
    const user = await User.create({
        name: req.body.name,
        avatar: req.body.avatar,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
    });
    res.status(200).json({
        status: 'success',
        value: user,
    });
}));
exports.getAllUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        status: 'success',
        value: users,
    });
}));
