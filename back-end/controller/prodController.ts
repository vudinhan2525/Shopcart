import AppError from '../utils/AppError';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Product from '../models/productModel';
import APIFeature from '../utils/apiFeature';
import catchAsync from '../utils/catchAsync';
import uploadToAzureBlobStorage, {
    deleteFromAzureBlobStorage,
} from '../services/azureBlob';
import IProduct from '../interfaces/IProduct';
import User from '../models/userModel';
import DetailProd from '../models/detailProdModel';
import Shop from '../models/shopModel';
const factory = require('./factoryController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
exports.upLoad = upload.array('images', 5);

exports.addProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    //detail
    const detailProd = await DetailProd.create({
        header: req.body.name,
        text: req.body.description,
    });
    if (!detailProd) {
        return next(new AppError('Cannot create a detail for product!', 400));
    }
    //image
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
            const decodedUrl = decodeURIComponent(imageUrl);
            uploadedUrls.push(decodedUrl);
        }
    }
    const variants = req.body.variants ? JSON.parse(req.body.variants) : [];
    const data = await Product.create({
        name: req.body.name,
        type: JSON.parse(req.body.type),
        brand: req.body.brand,
        summary: req.body.summary,
        originalPrice: req.body.originalPrice,
        price: req.body.price,
        images: uploadedUrls,
        itemLeft: req.body.itemLeft,
        variants: variants,
        details: detailProd._id,
        shop: req.body.shop,
    });
    await Shop.findByIdAndUpdate(req.body.shop, {
        $push: { products: data._id },
    });
    if (req.body.cateGory) {
        await Shop.findOneAndUpdate(
            { _id: req.body.shop, 'categories.category': req.body.cateGory },
            { $push: { 'categories.$.prods': data._id } },
        );
    }
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.getAllProd = factory.getAll(Product);
exports.getProd = factory.getOne(Product);
exports.updateProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    //update detail
    console.log(req.body);
    console.log(req.body.oldImages);
    const detailId = req.body.details;
    const detailProd = await DetailProd.findByIdAndUpdate(
        detailId,
        {
            text: req.body.description,
        },
        { new: true },
    );
    if (!detailProd) {
        return next(new AppError('Cannot create a detail for product!', 400));
    }
    //images
    const files = req.files as Express.Multer.File[];
    let uploadedUrls = [];
    if (files && files.length !== 0) {
        const containerName = 'shopcartctn';
        const connectionString = process.env.AZURE_CONNECTION_STRING as string;
        for (let i = 0; i < files.length; i++) {
            const imageBuffer = files[i].buffer;
            const blobName = `${Date.now()}-${files[i].originalname}`;
            const imageUrl = await uploadToAzureBlobStorage(
                imageBuffer,
                containerName,
                blobName,
                connectionString,
            );
            uploadedUrls.push(imageUrl);
        }
        const oldImageUrls = JSON.parse(req.body.oldImages);
        for (let i = 0; i < oldImageUrls.length; i++) {
            const oldBlobName = oldImageUrls[i].substring(
                oldImageUrls[i].lastIndexOf('/') + 1,
            );
            await deleteFromAzureBlobStorage(
                containerName,
                oldBlobName,
                connectionString,
            );
        }
    } else {
        uploadedUrls = JSON.parse(req.body.oldImages);
    }
    //
    const variants = req.body.variants ? JSON.parse(req.body.variants) : [];
    const data = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            type: JSON.parse(req.body.type),
            brand: req.body.brand,
            summary: req.body.summary,
            originalPrice: req.body.originalPrice,
            price: req.body.price,
            images: uploadedUrls,
            itemLeft: req.body.itemLeft,
            variants: variants,
        },
        { new: true },
    );
    if (!data) {
        return next(new AppError('Cannot update this product!!!', 500));
    }
    if (
        req.body.oldCateGory &&
        req.body.cateGory &&
        req.body.oldCateGory !== req.body.cateGory
    ) {
        await Shop.findOneAndUpdate(
            { _id: req.body.shop, 'categories.category': req.body.oldCateGory },
            { $pull: { 'categories.$.prods': req.params.id } },
        );
        await Shop.findOneAndUpdate(
            { _id: req.body.shop, 'categories.category': req.body.cateGory },
            { $push: { 'categories.$.prods': data._id } },
        );
    }
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.deleteProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Product.findById(req.params.id);
    if (!data) {
        return next(new AppError('Cannot find this product!!', 400));
    }
    await DetailProd.deleteOne({
        _id: data.details,
    });
    console.log(data.images);
    const oldImageUrls = data.images;
    const containerName = 'shopcartctn';
    const connectionString = process.env.AZURE_CONNECTION_STRING as string;
    for (let i = 0; i < oldImageUrls.length; i++) {
        const oldBlobName = oldImageUrls[i].substring(
            oldImageUrls[i].lastIndexOf('/') + 1,
        );
        await deleteFromAzureBlobStorage(
            containerName,
            oldBlobName,
            connectionString,
        );
    }
    const shop = await Shop.findByIdAndUpdate(
        data.shop,
        {
            $pull: { products: data._id },
        },
        { new: true },
    );
    if (!shop) {
        return next(new AppError('Cannot find this shop of product!!', 400));
    }
    for (const category of shop.categories) {
        const index = category.prods.findIndex(
            (prod) => prod.toString() === data._id.toString(),
        );
        if (index !== -1) {
            category.prods.splice(index, 1);
        }
    }
    await shop.save();
    const deleteProdResult = await Product.deleteOne({ _id: req.params.id });
    if (deleteProdResult.deletedCount !== 1) {
        return next(new AppError('Delete failed!!', 400));
    }
    res.status(200).json({
        status: 'success',
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
