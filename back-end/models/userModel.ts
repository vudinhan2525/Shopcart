import mongoose from 'mongoose';
import { Document } from 'mongoose';
const validator = require('validator');
interface IUser extends Document {
    name: string;
    avatar?: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    passwordChangeAt: Date;
}
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name.'],
        trim: true,
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'A user must have a email.'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Email is invalid',
        },
    },
    password: {
        type: String,
        required: [true, 'A user must have a password.'],
        trim: true,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'A user must have a confirm password.'],
        trim: true,
        validate: {
            validator: function (this: IUser, val: string): Boolean {
                return val === this.password;
            },
            message: 'Password confirm is not correct',
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangeAt: Date,
});
const User = mongoose.model<IUser>('User', userSchema);
module.exports = User;
