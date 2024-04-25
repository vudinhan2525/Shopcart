import mongoose from 'mongoose';

interface IShop {
    _id: string;
    name: string;
    summary: string;
    type: string;
    isChecked: boolean;
    avatar: string;
    background: string;
    products: mongoose.Types.ObjectId[];
    followers: number;
    averageRating: number;
    numberRating: number;
    categories: {
        category: string;
        prods: mongoose.Types.ObjectId[];
    }[];
    isActive: boolean;
    lastActive: Date;
}
export default IShop;
