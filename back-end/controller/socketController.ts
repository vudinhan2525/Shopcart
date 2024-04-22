import Conversation from '../models/conversationModel';
import Message from '../models/messageModel';
const mongoose = require('mongoose');
export const getChatList = async (userId: string) => {
    try {
        const convs = await Conversation.aggregate([
            {
                $match: { user_id: new mongoose.Types.ObjectId(userId) },
            },
            {
                $project: {
                    _id: 1,
                    shop_id: 1,
                },
            },
            {
                $lookup: {
                    from: 'shops',
                    localField: 'shop_id',
                    foreignField: '_id',
                    as: 'shop',
                },
            },
            {
                $unwind: '$shop',
            },
            {
                $project: {
                    _id: 1,
                    shop: {
                        name: 1,
                        isChecked: 1,
                        avatar: 1,
                    },
                },
            },
        ]);
        if (!convs || convs.length == 0) {
            console.log('Cannot find conversation of this user');
            return [];
        }
        const resArr = [];
        for (let i = 0; i < convs.length; i++) {
            const msgs = await Message.aggregate([
                {
                    $match: {
                        conv_id: new mongoose.Types.ObjectId(convs[i]._id),
                    },
                },
                {
                    $sort: { createdAt: 1 },
                },
            ]);
            resArr.push({
                conv_id: convs[i]._id,
                shop: {
                    name: convs[i].shop.name,
                    isChecked: convs[i].shop.isChecked,
                    avatar: convs[i].shop.avatar,
                },
                message: msgs,
            });
        }
        return resArr;
    } catch (error) {
        console.log(error);
    }
};
