import ICovnersation from '../interfaces/IConversation';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Conversation from '../models/conversationModel';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';

exports.addConversation = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const { user_id, shop_id } = req.body;
    if (!user_id || !shop_id) {
        return next(new AppError('Please provide userId and shopId', 400));
    }
    await Conversation.create({
        user_id,
        shop_id,
    });
    res.status(200).json({
        status: 'success',
    });
}));
