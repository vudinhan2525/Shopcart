import mongoose, { Schema, model } from 'mongoose';
import IBill from '../interfaces/IBill';
const billSchema = new mongoose.Schema<IBill>({
    status: {
        type: String,
        enum: ['pending', 'success'],
        default: 'pending',
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    dateCompleted: {
        type: Date,
    },
    method: {
        type: String,
        enum: ['onlinepayment', 'ship'],
        default: 'ship',
    },
    products: {
        product: {
            type: Schema.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            default: 1,
        },
        price: {
            type: Number,
        },
    },
});
const Bill = model<IBill>('Bill', billSchema);
export default Bill;
