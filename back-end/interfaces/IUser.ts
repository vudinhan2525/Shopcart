import mongoose, { Schema } from 'mongoose';

interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    background?: string;
    email: string;
    phonenumber: string;
    password: string;
    passwordConfirm: string | undefined;
    role: string;
    passwordResetToken: string | undefined;
    passwordResetExpires: Date | undefined;
    passwordChangeAt: Date;
    correctPassword(
        duplicatePassword: string,
        password: string,
    ): Promise<boolean>;
    verifyPasswordChanged(JWTTimeCreate: number): boolean;
    createPasswordResetToken(): string;
    products: {
        productId: mongoose.Types.ObjectId | string;
        quantity: number;
    }[];
    likes: mongoose.Types.ObjectId[];
    shop: mongoose.Types.ObjectId[];
    address: mongoose.Types.ObjectId[];
    bill: mongoose.Types.ObjectId[];
    notifications: mongoose.Types.ObjectId[];
    adminShop: mongoose.Types.ObjectId[];
}
export default IUser;
