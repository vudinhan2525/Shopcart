import mongoose from 'mongoose';

interface ICovnersation {
    _id: string;
    user_id: mongoose.Types.ObjectId;
    shop_id: mongoose.Types.ObjectId;
    updatedAt: Date;
    userSeenAt: Date;
    shopSeenAt: Date;
}
export default ICovnersation;
