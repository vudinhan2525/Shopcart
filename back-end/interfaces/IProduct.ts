import mongoose, { Schema } from 'mongoose';

interface IProduct {
    _id: string;
    name: string;
    type: string[];
    brand: string;
    summary: string;
    originalPrice: number;
    price: number;
    avgRatings: number;
    numberRatings: number;
    itemLeft: number;
    images: string[];
    details: mongoose.Types.ObjectId;
    dateUp: Date;
    ratings: mongoose.Types.ObjectId[];
    shop: mongoose.Types.ObjectId;
    variants: {
        name: string;
        content: string[];
    }[];
}
export default IProduct;
