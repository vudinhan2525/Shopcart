import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Bill from '../models/billModel';
import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';

exports.addBill = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const { status, method, products } = req.body.data;
    const data = await Bill.create({
        status,
        method,
        products: {
            product: products.product,
            quantity: products.quantity || 1,
            price: products.price,
        },
    });
    const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { bill: { $each: [data._id], $position: 0 } } },
        { new: true },
    );
    res.status(200).json({
        status: 'success',
    });
}));
exports.getAllBill = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await User.findById(req.params.userId).populate('bill');

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }

    res.status(200).json({
        status: 'success',
        data: user.bill,
    });
}));
