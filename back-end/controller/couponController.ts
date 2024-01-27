import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Coupon from '../models/couponModel';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';

exports.checkCoupon = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Coupon.findOne({ code: req.body.data });
    if (!data) {
        return next(new AppError('Coupon is invalid !!', 400));
    }
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));

exports.addCoupon = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    await Coupon.create({
        code: req.body.code,
        expired: req.body.expired,
        quantity: req.body.quantity,
        priceReduce: req.body.priceReduce,
        percentageReduce: req.body.percentageReduce,
    });
    res.status(200).json({
        status: 'success',
    });
}));
