import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Message from '../models/messageModel';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';

exports.addMessage = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    if (!req.body.conv_id || !req.body.fromUser) {
        return next(new AppError('Please provide convId and isFromUser', 400));
    }
    await Message.create({
        conv_id: req.body.conv_id,
        message: req.body.message,
        fromUser: req.body.fromUser,
    });
    res.status(200).json({
        status: 'success',
    });
}));
