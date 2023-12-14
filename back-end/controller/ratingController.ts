import catchAsync from '../utils/catchAsync';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import AppError from '../utils/AppError';
import APIFeature from '../utils/apiFeature';
import Rating from '../models/ratingModel';
import uploadToAzureBlobStorage from '../services/azureBlob';
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.getAllRating = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const doc = new APIFeature(Rating.find({}), req.query);
    doc.filter().sort().fields().pagination();
    const users = await doc.query;
    res.status(200).json({
        status: 'success',
        data: users,
    });
}));
exports.upLoad = upload.array('images', 5);
exports.addRating = catchAsync(<MiddleWareFn>(async (req, res, next) => {
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
    const rating = await Rating.create({
        dateRate: Date.now(),
        rating: req.body.rating,
        contentRating: req.body.contentRating,
        images: uploadedUrls,
        id_user: req.body.id_user,
        id_prod: req.body.id_prod,
        username: req.body.username,
        id_shop: req.body.id_shop,
    });
    rating.calcRatingOnProd(rating.id_prod);
    rating.calcRatingOnShop(rating.id_shop);
    res.status(200).json({
        status: 'success',
        data: rating,
    });
}));
exports.getRatingProd = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const doc = new APIFeature(
        Rating.find({ id_prod: req.params.idProd }),
        req.query,
    );
    doc.filter().sort().fields().pagination();
    const ratings = await doc.query;
    res.status(200).json({
        status: 'success',
        data: ratings,
    });
}));
