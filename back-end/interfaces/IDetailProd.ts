import mongoose from 'mongoose';

interface IDetailProd {
    _id: string;
    header: string;
    text: string;
    images: mongoose.Types.ObjectId[];
}
export default IDetailProd;
