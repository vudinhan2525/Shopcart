import mongoose, { Document } from 'mongoose';
import IUser from '../interfaces/IUser';
import { model } from 'mongoose';
const validator = require('validator');
const userSchema = new mongoose.Schema<IUser>({
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
const User = model<IUser>('User', userSchema);
export default User;
