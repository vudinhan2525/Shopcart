import mongoose from 'mongoose';

interface IBill {
    _id: string;
    status: string;
    date: Date;
    dateCompleted?: Date;
    method: string;
    products: {
        product: mongoose.Types.ObjectId;
        quantity: Number;
        price: Number;
    };
}
export default IBill;
