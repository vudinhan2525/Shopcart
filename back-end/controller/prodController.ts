import AppError from '../utils/AppError';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Product from '../models/productModel';
import APIFeature from '../utils/apiFeature';
import catchAsync from '../utils/catchAsync';
const factory = require('./factoryController');
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
        details: req.body.details,
        shop: req.body.shop,
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.getAllProd = factory.getAll(Product);
exports.getProd = factory.getOne(Product);
exports.updateProd = factory.updateOne(Product);
