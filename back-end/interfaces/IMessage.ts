import mongoose from 'mongoose';

interface IMessage {
    _id: string;
    conv_id: mongoose.Types.ObjectId;
    fromUser: boolean;
    message: string;
    createdAt: Date;
}
export default IMessage;
