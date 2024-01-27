import mongoose, { Schema, model } from 'mongoose';
import ICoupon from '../interfaces/ICoupon';
const couponSchema = new mongoose.Schema<ICoupon>({
    code: {
        type: String,
        unique: true,
    },
    expired: Date,
    quantity: Number,
    priceReduce: Number,
    percentageReduce: Number,
});
const Coupon = model<ICoupon>('Coupon', couponSchema);
export default Coupon;
