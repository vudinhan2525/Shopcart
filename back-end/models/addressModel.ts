import mongoose, { Schema, model } from 'mongoose';
import IAddress from '../interfaces/IAddress';
const addressSchema = new mongoose.Schema<IAddress>({
    receiveName: {
        type: String,
        required: [true, 'Address must have a receive name'],
    },
    email: {
        type: String,
        required: [true, 'Address must have a email'],
    },
    phonenumber: {
        type: String,
        required: [true, 'Address must have a phone number'],
    },
    address: {
        type: String,
        required: [true, 'Need an address'],
    },
});
const Address = model<IAddress>('Address', addressSchema);
export default Address;
