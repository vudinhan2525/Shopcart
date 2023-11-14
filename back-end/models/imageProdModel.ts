import { Schema, model } from 'mongoose';
import IImageProd from '../interfaces/IImageProd';
const imageProdSchema = new Schema<IImageProd>({
    url: {
        type: String,
        required: [true, 'Image must have a url'],
    },
});
const ImageProd = model<IImageProd>('ImageProd', imageProdSchema);
export default ImageProd;
