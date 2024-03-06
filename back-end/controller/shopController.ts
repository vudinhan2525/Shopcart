import AppError from '../utils/AppError';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Shop from '../models/shopModel';
import APIFeature from '../utils/apiFeature';
const mongoose = require('mongoose');
import catchAsync from '../utils/catchAsync';
import uploadToAzureBlobStorage from '../services/azureBlob';
import User from '../models/userModel';
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
exports.getAllShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const doc = new APIFeature(Shop.find({}), req.query);
    doc.filter().sort().fields().pagination();
    const users = await doc.query;
    res.status(200).json({
        status: 'success',
        data: users,
    });
}));
exports.upLoad = upload.array('images', 2);
exports.addShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const files = req.files as Express.Multer.File[];
    const uploadedUrls = [];
    if (files && files.length !== 0) {
        for (let i = 0; i < files.length; i++) {
            const imageBuffer = files[i].buffer;
            const containerName = 'shopcartctn';
            const blobName = `${Date.now()}-${files[i].originalname}`;
            const connectionString = process.env
                .AZURE_CONNECTION_STRING as string;
            const imageUrl = await uploadToAzureBlobStorage(
                imageBuffer,
                containerName,
                blobName,
                connectionString,
            );
            uploadedUrls.push(imageUrl);
        }
    }
    const shop = await Shop.create({
        name: req.body.name,
        summary: req.body.description,
        type: JSON.parse(req.body.types),
        avatar: uploadedUrls[0],
        background: uploadedUrls[1],
    });
    const user = await User.findById(req.user?._id);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }
    const shopId = new mongoose.Types.ObjectId(shop._id);
    user.adminShop.push(shopId);
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        status: 'success',
        data: shop,
    });
}));
exports.getShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Shop.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.updateShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await Shop.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: user,
    });
}));
exports.getRelatedShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Shop.find({ _id: { $in: req.body.data } });
    const idPositions = new Map();
    req.body.data.map((el: string, idx: number) => {
        idPositions.set(el, idx);
    });
    data.sort((a, b) => {
        const x = idPositions.get(a._id.toString());
        const y = idPositions.get(b._id.toString());
        return x - y;
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.addCategories = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const { newCategories, shopId } = req.body.data;
    if (!newCategories || !shopId) {
        return next(
            new AppError('Please provide all information needed!!', 400),
        );
    }
    const shop = await Shop.findByIdAndUpdate(
        shopId,
        {
            $push: { categories: { category: newCategories } },
        },
        { new: true },
    );
    if (!shop) {
        return next(new AppError('Shop not found', 404));
    }
    res.status(200).json({
        status: 'success',
    });
}));
exports.deleteCategories = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const { categoryId, shopId } = req.body.data;
    if (!categoryId || !shopId) {
        return next(
            new AppError('Please provide all information needed!!', 400),
        );
    }
    const shop = await Shop.findByIdAndUpdate(
        shopId,
        {
            $pull: { categories: { _id: categoryId } },
        },
        { new: true },
    );
    if (!shop) {
        return next(new AppError('Shop not found', 404));
    }
    res.status(200).json({
        status: 'success',
    });
}));
