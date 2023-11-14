import mongoose, { Schema, model } from 'mongoose';
import IProduct from '../interfaces/IProduct';
const productSchema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: [true, 'Product must have a name'],
    },
    type: [
        {
            type: String,
            required: [true, 'Product must have types'],
            enum: {
                values: [
                    'tech',
                    'phone',
                    'tablet',
                    'laptop',
                    'desktop',
                    'tivi',
                    'fridge',
                    'camera',
                    'headphone',
                    'accesory',
                    'fashion',
                    'furniture',
                    'clothes',
                    'books',
                    'sneaker',
                    'travel',
                ],
                message: 'Enum error in type of product',
            },
        },
    ],
    brand: {
        type: String,
        required: [true, 'Product must have a brand'],
    },
    summary: {
        type: String,
        required: [true, 'Product must have a summary'],
    },
    price: {
        type: Number,
        required: [true, 'Product must have a price'],
    },
    avgRatings: {
        type: Number,
        default: 4.5,
        min: [0, 'rating must be above 0'],
        max: [5, 'rating must be below 5.0'],
        set: (prev: number) => Math.round(prev * 10) / 10,
    },
    numberRatings: {
        type: Number,
        default: 0,
    },
    itemLeft: {
        type: Number,
        min: [1, 'Item left must be above 1'],
    },
    images: [
        {
            type: Schema.ObjectId,
            ref: 'ImageProd',
        },
    ],
    details: {
        type: Schema.ObjectId,
        ref: 'DetailProd',
        required: [true, 'Product must have a detail'],
    },
    dateUp: {
        type: Date,
        default: Date.now(),
    },
    ratings: [
        {
            type: Schema.ObjectId,
            ref: 'Rating',
        },
    ],
    shop: {
        type: Schema.ObjectId,
        ref: 'Shop',
        required: [true, 'Product must belong to a shop'],
    },
});
const Product = model<IProduct>('Product', productSchema);
export default Product;
