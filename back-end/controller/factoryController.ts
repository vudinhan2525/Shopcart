import AppError from '../utils/AppError';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import APIFeature from '../utils/apiFeature';
import catchAsync from '../utils/catchAsync';
exports.getAll = (Model: any) =>
    catchAsync(<MiddleWareFn>(async (req, res, next) => {
        const doc = new APIFeature(Model.find({}), req.query);
        doc.filter().sort().fields().pagination();
        const users = await doc.query;
        res.status(200).json({
            status: 'success',
            data: users,
        });
    }));

exports.getOne = (Model: any) =>
    catchAsync(<MiddleWareFn>(async (req, res, next) => {
        let query = await Model.findOne({ _id: req.params.id });
        const doc = await query;
        if (!doc) {
            return next(new AppError(`Can't find this id`, 404));
        }
        res.status(200).json({
            status: 'success',
            data: doc,
        });
    }));
exports.updateOne = (Model: any) =>
    catchAsync(<MiddleWareFn>(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!doc) {
            return next(new AppError(`Can't find this id`, 404));
        }
        res.status(200).json({
            status: 'success',
            data: doc,
        });
    }));
