import Conversation from '../models/conversationModel';
import Message from '../models/messageModel';
import Shop from '../models/shopModel';
const mongoose = require('mongoose');
export const getChatListForUser = async (userId: string) => {
    try {
        const convs = await Conversation.aggregate([
            {
                $match: { user_id: new mongoose.Types.ObjectId(userId) },
            },
            {
                $project: {
                    _id: 1,
                    shop_id: 1,
                    updatedAt: 1,
                    userSeenAt: 1,
                    shopSeenAt: 1,
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
                    updatedAt: 1,
                    userSeenAt: 1,
                    shopSeenAt: 1,
                    shop: {
                        name: 1,
                        isChecked: 1,
                        avatar: 1,
                        isActive: 1,
                        lastActive: 1,
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
                updatedAt: convs[i].updatedAt,
                shopSeenAt: convs[i].shopSeenAt,
                userSeenAt: convs[i].userSeenAt,
                shop: {
                    name: convs[i].shop.name,
                    isChecked: convs[i].shop.isChecked,
                    avatar: convs[i].shop.avatar,
                    isActive: convs[i].shop.isActive,
                    lastActive: convs[i].shop.lastActive,
                },
                message: msgs,
            });
        }
        resArr.sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            return dateB.getTime() - dateA.getTime();
        });
        return resArr;
    } catch (error) {
        console.log(error);
    }
};
export const addMessage = async (data: {
    fromUser: boolean;
    convId: string;
    message: string;
}) => {
    const message = await Message.create({
        conv_id: data.convId,
        fromUser: data.fromUser,
        message: data.message,
        createdAt: Date.now(),
    });
    await Conversation.updateOne(
        {
            _id: data.convId,
        },
        {
            updatedAt: Date.now(),
        },
    );
    return message;
};
export const getShopList = async (userShop: string[]) => {
    const shops = await Shop.find({ _id: { $in: userShop } });
    return shops;
};
export const getChatListForShop = async (shopId: string) => {
    const convs = await Conversation.aggregate([
        {
            $match: { shop_id: new mongoose.Types.ObjectId(shopId) },
        },
        {
            $project: {
                conv_id: '$_id',
                user_id: 1,
                updatedAt: 1,
                userSeenAt: 1,
                shopSeenAt: 1,
                _id: 0,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $project: {
                conv_id: 1,
                updatedAt: 1,
                userSeenAt: 1,
                shopSeenAt: 1,
                user: {
                    firstName: 1,
                    lastName: 1,
                    avatar: 1,
                    isActive: 1,
                    lastActive: 1,
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
                    conv_id: new mongoose.Types.ObjectId(convs[i].conv_id),
                },
            },
            {
                $sort: { createdAt: 1 },
            },
        ]);
        resArr.push({
            conv_id: convs[i].conv_id,
            updatedAt: convs[i].updatedAt,
            shopSeenAt: convs[i].shopSeenAt,
            userSeenAt: convs[i].userSeenAt,
            user: {
                firstName: convs[i].user.firstName,
                lastName: convs[i].user.lastName,
                avatar: convs[i].user.avatar,
                isActive: convs[i].user.isActive,
                lastActive: convs[i].user.lastActive,
            },
            message: msgs,
        });
    }
    resArr.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB.getTime() - dateA.getTime();
    });
    return resArr;
};
