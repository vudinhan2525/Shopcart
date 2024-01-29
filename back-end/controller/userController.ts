import catchAsync from '../utils/catchAsync';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import APIFeature from '../utils/apiFeature';
import User from '../models/userModel';
import uploadToAzureBlobStorage from '../services/azureBlob';
import { deleteFromAzureBlobStorage } from '../services/azureBlob';
import AppError from '../utils/AppError';
import sendJsonToken from '../utils/sendJWT';
import { Types } from 'mongoose';
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
exports.addUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        background: req.body.background,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
    });
    res.status(200).json({
        status: 'success',
        data: user,
    });
}));
exports.getAllUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const doc = new APIFeature(User.find({}), req.query);
    doc.filter().sort().fields().pagination();
    const users = await doc.query;
    res.status(200).json({
        status: 'success',
        data: users,
    });
}));
exports.getMe = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    req.params.id = res.locals.user._id;
    next();
}));
exports.getOneUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: user,
    });
}));
exports.updateUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: user,
    });
}));
exports.addUserProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const { prodId, quantity } = req.body.data;
    const productId: Types.ObjectId | string = prodId;
    if (!prodId || !quantity) {
        return next(new AppError('Product ID and quantity are required.', 400));
    }
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new AppError('User not found.', 404));
        }
        const existingProduct = user.products.find(
            (product) => product.productId.toString() === productId,
        );
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            user.products.push({ productId, quantity });
        }
        await user.save({ validateBeforeSave: false });
        res.status(200).json({
            status: 'success',
            message: 'Product added to user successfully.',
        });
    } catch (error) {
        next(error);
    }
}));
exports.addQuantityProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
        return next(new AppError('User not found.', 404));
    }
    const existingProduct = user.products.find(
        (product) => product.productId.toString() === req.params.prodId,
    );
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        return next(new AppError('Product of user cannot be found', 400));
    }
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        status: 'success',
    });
}));
exports.subQuantityProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
        return next(new AppError('User not found.', 404));
    }
    const existingProduct = user.products.find(
        (product) => product.productId.toString() === req.params.prodId,
    );
    if (existingProduct) {
        existingProduct.quantity -= 1;
    } else {
        return next(new AppError('Product of user cannot be found', 400));
    }
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        status: 'success',
    });
}));
exports.deleteUser = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'success',
    });
}));
exports.upLoad = upload.single('image');
exports.updateImage = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const file = req.file as Express.Multer.File;
    if (file) {
        //upload image to azure
        const imageBuffer = file.buffer;
        const containerName = 'shopcartctn';
        const blobName = `${Date.now()}-${file.originalname}`;
        const connectionString = process.env.AZURE_CONNECTION_STRING as string;
        const imageUrl = await uploadToAzureBlobStorage(
            imageBuffer,
            containerName,
            blobName,
            connectionString,
        );
        let oldImageUrl;
        if (req.body.isBg) {
            oldImageUrl = req.user?.background;
            await User.findByIdAndUpdate(req.user?._id, {
                background: imageUrl,
            });
        } else {
            oldImageUrl = req.user?.avatar;
            await User.findByIdAndUpdate(req.user?._id, {
                avatar: imageUrl,
            });
        }
        //delete old image
        if (
            oldImageUrl &&
            oldImageUrl !==
                'https://shopcartimg2.blob.core.windows.net/shopcartctn/bg-user.png' &&
            oldImageUrl !==
                'https://shopcartimg2.blob.core.windows.net/shopcartctn/avatar3dgirl.jpg' &&
            oldImageUrl !==
                'https://shopcartimg2.blob.core.windows.net/shopcartctn/avatar3d.jpg'
        ) {
            const oldBlobName = oldImageUrl.substring(
                oldImageUrl.lastIndexOf('/') + 1,
            );
            await deleteFromAzureBlobStorage(
                containerName,
                oldBlobName,
                connectionString,
            );
        }
        return res.status(200).json({
            status: 'success',
        });
    }
    return next(new AppError('No files uploaded !!', 400));
}));
exports.changePassword = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const { curPassword, newPassword, newPasswordConfirm } = req.body.data;
    if (curPassword && newPassword && newPasswordConfirm) {
        const user = await User.findById(req.user?._id).select('+password');
        if (!user) {
            return next(new AppError("User doesn't exits !!!", 400));
        }
        if (!(await user.correctPassword(curPassword, user.password))) {
            return res.status(400).json({
                status: 'wrong password',
                message: 'Your password is wrong !!',
            });
        }
        user.password = newPassword;
        user.passwordConfirm = newPasswordConfirm;
        user.save();
        return sendJsonToken(user, 200, req, res);
    }
    res.status(400).json({
        status: 'not enough informations',
        message: 'Please provide all informations needed !!',
    });
}));
