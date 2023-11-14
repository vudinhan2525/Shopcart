import AppError from '../utils/AppError';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Product from '../models/productModel';
import APIFeature from '../utils/apiFeature';

import catchAsync from '../utils/catchAsync';
exports.getAllProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const doc = new APIFeature(Product.find({}), req.query);
    doc.filter().sort().fields().pagination();
    const users = await doc.query;
    res.status(200).json({
        status: 'success',
        data: users,
    });
}));
exports.addProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Product.create({
        name: req.body.name,
        type: req.body.type,
        brand: req.body.brand,
        summary: req.body.summary,
        price: req.body.price,
        avgRatings: req.body.avgRatings,
        numberRatings: req.body.numberRatings,
        itemLeft: req.body.itemLeft,
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
