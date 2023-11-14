import mongoose, { Schema } from 'mongoose';

interface IProduct {
    _id: string;
    name: string;
    type: string[];
    brand: string;
    summary: string;
    price: number;
    avgRatings: number;
    numberRatings: number;
    itemLeft: number;
    images: mongoose.Types.ObjectId[];
    details: mongoose.Types.ObjectId;
    dateUp: Date;
    ratings: mongoose.Types.ObjectId[];
}
export default IProduct;
