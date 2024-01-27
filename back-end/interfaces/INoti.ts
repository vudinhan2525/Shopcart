import mongoose from 'mongoose';

interface INoti {
    _id: string;
    header: string;
    content: string;
    images: string;
    types: string;
    link: string;
    billId: mongoose.Types.ObjectId;
    dateUp: Date;
}
export default INoti;
