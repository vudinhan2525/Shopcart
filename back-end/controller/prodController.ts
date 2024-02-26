import AppError from '../utils/AppError';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Product from '../models/productModel';
import APIFeature from '../utils/apiFeature';
import catchAsync from '../utils/catchAsync';
import uploadToAzureBlobStorage from '../services/azureBlob';
import IProduct from '../interfaces/IProduct';
import User from '../models/userModel';
const factory = require('./factoryController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
exports.upLoad = upload.array('images', 5);

exports.addProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Product.create({
        name: req.body.name,
        type: req.body.type,
        brand: req.body.brand,
        summary: req.body.summary,
        price: req.body.price,
        avgRatings: req.body.avgRatings,
        numberRatings: req.body.numberRatings,
        itemLeft: req.body.itemLeft,
        details: req.body.details,
        shop: req.body.shop,
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.getAllProd = factory.getAll(Product);
exports.getProd = factory.getOne(Product);
exports.updateProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
        return next(new AppError('No files uploaded !!', 400));
    }
    const uploadedUrls = [];
    for (let i = 0; i < files.length; i++) {
        const imageBuffer = files[i].buffer;
        const containerName = 'shopcartctn';
        const blobName = `${Date.now()}-${files[i].originalname}`;
        const connectionString = process.env.AZURE_CONNECTION_STRING as string;
        const imageUrl = await uploadToAzureBlobStorage(
            imageBuffer,
            containerName,
            blobName,
            connectionString,
        );
        uploadedUrls.push(imageUrl);
    }
    const doc = await Product.findByIdAndUpdate(
        req.params.id,
        { images: uploadedUrls },
        {
            new: true,
            runValidators: true,
        },
    );
    if (!doc) {
        return next(new AppError(`Can't find this id`, 404));
    }
    res.status(200).json({
        status: 'success',
        url: uploadedUrls,
    });
}));
exports.getRelatedProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Product.find({ _id: { $in: req.body.data } });
    const idPositions = new Map();
    data.forEach((el, idx) => {
        idPositions.set(el._id.toString(), idx);
    });
    let arr: IProduct[] = [];
    req.body.data.forEach((el: string, idx: number) => {
        arr.push(data[idPositions.get(el)]);
    });
    res.status(200).json({
        status: 'success',
        data: arr,
    });
}));
exports.getProdInArray = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const baseQuery = Product.find({ _id: { $in: req.body.data } });
    const doc = new APIFeature(baseQuery, req.query);
    doc.filter().sort().fields().pagination();
    const data = await doc.query;
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.deleteProdFromUserList = catchAsync(<MiddleWareFn>(async (
    req,
    res,
    next,
) => {
    const data = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { products: { productId: req.body.data } } },
        { new: true },
    );
    if (!data) {
        return next(new AppError('Cant find this user', 400));
    }
    res.status(200).json({
        status: 'success',
        data: req.body.data,
    });
}));
exports.getProdType = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    let baseQuery;
    if (!req.body.data) {
        baseQuery = Product.find({});
    } else {
        const types = req.body.data;
        baseQuery = Product.find({
            type: { $all: types },
        });
    }
    const doc = new APIFeature(baseQuery, req.query);
    doc.filter().sort().fields().pagination();
    const data = await doc.query;
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.countProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    let baseQuery;
    if (!req.query.types || typeof req.query.types !== 'string') {
        baseQuery = Product.find({});
    } else {
        const types = req.query.types.split(',');
        baseQuery = Product.find({
            type: { $all: types },
        });
    }
    const data = await Product.countDocuments(baseQuery);
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
