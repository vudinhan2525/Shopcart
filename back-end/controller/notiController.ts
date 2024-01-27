import { Types } from 'mongoose';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Noti from '../models/notiModel';
import APIFeature from '../utils/apiFeature';
import catchAsync from '../utils/catchAsync';
import User from '../models/userModel';
import AppError from '../utils/AppError';

exports.getAllNoti = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const doc = new APIFeature(Noti.find({}), req.query);
    doc.filter().sort().fields().pagination();
    const users = await doc.query;
    res.status(200).json({
        status: 'success',
        data: users,
    });
}));
exports.getRelatedNoti = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Noti.find({
        _id: { $in: req.body.data },
    });
    const idPositions = new Map();
    req.body.data.map((el: string, idx: number) => {
        idPositions.set(el, idx);
    });
    data.sort((a, b) => {
        const x = idPositions.get(a._id.toString());
        const y = idPositions.get(b._id.toString());
        return x - y;
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.addNoti = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Noti.create({
        types: req.body.types,
        header: req.body.header,
        content: req.body.content,
        link: req.body.link,
        images: req.body.images,
        billId: req.body.billId,
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.readOneNoti = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const { userId, notiId } = req.body;
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId, 'notifications.notiId': notiId },
        { $set: { 'notifications.$.isRead': true } },
        { new: true },
    );
    if (!updatedUser) {
        return next(new AppError('User not found!!', 400));
    }
    res.status(200).json({
        status: 'success',
    });
}));
exports.readAllNoti = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const { userId } = req.body;
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { 'notifications.$[].isRead': true } },
        { new: true },
    );
    if (!updatedUser) {
        return next(new AppError('User not found!!', 400));
    }
    res.status(200).json({
        status: 'success',
    });
}));
