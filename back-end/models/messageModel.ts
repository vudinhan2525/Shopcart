import mongoose, { Schema, model } from 'mongoose';
import IMessage from '../interfaces/IMessage';
const messageSchema = new mongoose.Schema<IMessage>({
    conv_id: {
        type: Schema.ObjectId,
        ref: 'Conversation',
    },
    message: String,
    fromUser: Boolean,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Message = model<IMessage>('Message', messageSchema);
export default Message;
