import mongoose from 'mongoose';

interface IRating {
    dateRate: Date;
    rating: number;
    contentRating: string;
    images: string[];
    id_user: mongoose.Types.ObjectId;
    id_prod: mongoose.Types.ObjectId;
    username: string;
    id_shop: mongoose.Types.ObjectId;
    calcRatingOnProd(prodId: mongoose.Types.ObjectId): void;
    calcRatingOnShop(shopId: mongoose.Types.ObjectId): void;
}
export default IRating;
