import mongoose, { Schema, model } from 'mongoose';
import INoti from '../interfaces/INoti';
const notiSchema = new mongoose.Schema<INoti>({
    header: String,
    content: String,
    link: String,
    images: String,
    types: {
        type: String,
        enum: ['productNoti', 'saleNoti'],
        default: 'saleNoti',
    },
    billId: {
        type: Schema.ObjectId,
        ref: 'Bill',
    },
});
const Noti = model<INoti>('Noti', notiSchema);
export default Noti;
