import AppError from '../utils/AppError';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Shop from '../models/shopModel';
import APIFeature from '../utils/apiFeature';

import catchAsync from '../utils/catchAsync';
exports.getAllShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const doc = new APIFeature(Shop.find({}), req.query);
    doc.filter().sort().fields().pagination();
    const users = await doc.query;
    res.status(200).json({
        status: 'success',
        data: users,
    });
}));
exports.addShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Shop.create({
        name: req.body.name,
        summary: req.body.summary,
        type: req.body.type,
        isChecked: req.body.isChecked,
        avatar: req.body.avatar,
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.getShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Shop.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.updateShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await Shop.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: user,
    });
}));
