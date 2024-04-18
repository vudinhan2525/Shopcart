import mongoose, { Schema, model } from 'mongoose';
import IConversation from '../interfaces/IConversation';
const conversationSchema = new mongoose.Schema<IConversation>({
    user_id: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    shop_id: {
        type: Schema.ObjectId,
        ref: 'Shop',
    },
});
conversationSchema.index({ user_id: 1, shop_id: 1 }, { unique: true });
const Conversation = model<IConversation>('Conversation', conversationSchema);
export default Conversation;
