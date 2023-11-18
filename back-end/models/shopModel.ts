import { Schema, model } from 'mongoose';
import IShop from '../interfaces/IShop';
const shopSchema = new Schema<IShop>({
    name: {
        type: String,
        required: [true, 'Shop must have a name'],
    },
    summary: {
        type: String,
        required: [true, 'Shop must have a summary'],
    },
    type: [
        {
            type: String,
            required: [true, 'Shop must have types'],
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
                    'jewelery',
                    'electronics',
                    'clothes',
                    'books',
                    'sneaker',
                    'travel',
                ],
                message: 'Enum error in type of product',
            },
        },
    ],
    isChecked: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
    },
    background: String,
    products: [
        {
            type: Schema.ObjectId,
            ref: 'Product',
        },
    ],
    followers: {
        type: Number,
        default: 0,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    numberRating: {
        type: Number,
        default: 0,
    },
});
const Shop = model<IShop>('Shop', shopSchema);
export default Shop;
