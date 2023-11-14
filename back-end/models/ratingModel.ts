import mongoose, { Schema, model } from 'mongoose';
import IRating from '../interfaces/IRating';
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
    id_user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Rating must belong to a user'],
    },
    username: {
        type: String,
        required: [true, 'Rating must have a username'],
    },
});
const Rating = model<IRating>('Rating', ratingSchema);
export default Rating;
