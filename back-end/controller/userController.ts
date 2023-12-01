import catchAsync from '../utils/catchAsync';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import APIFeature from '../utils/apiFeature';
import User from '../models/userModel';

exports.addUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        background: req.body.background,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
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
    const doc = new APIFeature(User.find({}), req.query);
    doc.filter().sort().fields().pagination();
    const users = await doc.query;
    res.status(200).json({
        status: 'success',
        data: users,
    });
}));
exports.getMe = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    req.params.id = res.locals.user._id;
    next();
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
