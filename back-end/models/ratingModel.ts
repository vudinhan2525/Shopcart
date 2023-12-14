import mongoose, { Model, Schema, model } from 'mongoose';
import IRating from '../interfaces/IRating';
import Product from './productModel';
import Shop from './shopModel';
const ratingSchema = new mongoose.Schema<IRating>({
    dateRate: {
        type: Date,
        default: Date.now(),
    },
    rating: {
        type: Number,
        min: [0, 'rating must be above 0'],
        max: [5, 'rating must be below 5.0'],
        set: (prev: number) => Math.round(prev * 10) / 10,
        required: [true, 'Rating must have a rating'],
    },
    contentRating: {
        type: String,
    },
    images: [
        {
            type: String,
        },
    ],
    id_user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Rating must belong to a user'],
    },
    id_prod: {
        type: Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Rating must belong to a product'],
    },
    username: {
        type: String,
        required: [true, 'Rating must have a username'],
    },
    id_shop: {
        type: Schema.ObjectId,
        ref: 'Shop',
        required: [true, 'Rating must belong to a shop'],
    },
});
ratingSchema.methods.calcRatingOnProd = async function (
    prodId: mongoose.Types.ObjectId,
) {
    const data = await Rating.aggregate([
        {
            $match: { id_prod: prodId },
        },
        {
            $group: {
                _id: '$id_prod',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' },
            },
        },
    ]);
    if (data.length > 0) {
        await Product.findByIdAndUpdate(prodId, {
            avgRatings: data[0].avgRating,
            numberRatings: data[0].nRating,
        });
    } else {
        await Product.findByIdAndUpdate(prodId, {
            avgRatings: 0,
            numberRatings: 0,
        });
    }
};
ratingSchema.methods.calcRatingOnShop = async function (
    shopId: mongoose.Types.ObjectId,
) {
    const data = await Rating.aggregate([
        {
            $match: { id_shop: shopId },
        },
        {
            $group: {
                _id: '$id_shop',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' },
            },
        },
    ]);
    if (data.length > 0) {
        await Shop.findByIdAndUpdate(shopId, {
            averageRating: data[0].avgRating,
            numberRating: data[0].nRating,
        });
    } else {
        await Product.findByIdAndUpdate(shopId, {
            averageRating: 0,
            numberRating: 0,
        });
    }
};
const Rating = model<IRating>('Rating', ratingSchema);
export default Rating;
