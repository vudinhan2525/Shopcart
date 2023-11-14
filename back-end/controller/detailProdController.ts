import AppError from '../utils/AppError';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import DetailProd from '../models/detailProdModel';
import catchAsync from '../utils/catchAsync';
exports.getDetailProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await DetailProd.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.addDetailProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await DetailProd.create({
        header: req.body.header,
        text: req.body.text,
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
