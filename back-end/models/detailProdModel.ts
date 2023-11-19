import mongoose, { Schema, model } from 'mongoose';
import IDetailProd from '../interfaces/IDetailProd';
const detailProdSchema = new Schema<IDetailProd>({
    header: {
        type: String,
        required: [true, 'Detail product must have a header'],
    },
    text: {
        type: String,
        required: [true, 'Detail product must have a text'],
    },
});
const DetailProd = model<IDetailProd>('DetailProd', detailProdSchema);
export default DetailProd;
