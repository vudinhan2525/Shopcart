import catchAsync from '../utils/catchAsync';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';

import User from '../models/userModel';
exports.addUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
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
        data: user,
    });
}));
exports.getAllUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        status: 'success',
        data: users,
    });
}));
exports.getOneUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: user,
    });
}));
exports.updateUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: user,
    });
}));
exports.deleteUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'success',
    });
}));
