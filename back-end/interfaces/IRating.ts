import mongoose from 'mongoose';

interface IRating {
    dateRate: Date;
    rating: number;
    contentRating: string;
    id_user: mongoose.Types.ObjectId;
    username: string;
    id_shop: mongoose.Types.ObjectId;
}
export default IRating;
