import mongoose, { Document } from 'mongoose';
import IUser from '../interfaces/IUser';
import { model } from 'mongoose';
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});
userSchema.methods.correctPassword = async function (
    duplicatePassword: string,
    password: string,
) {
    return await bcrypt.compare(duplicatePassword, password);
};
userSchema.methods.verifyPasswordChanged = function (JWTTimeCreate: number) {
    if (this.passwordChangeAt) {
        const time = parseInt(
            (this.passwordChangeAt.getTime() / 1000).toString(),
            10,
        );
        return time > JWTTimeCreate;
    }
    return false;
};
const User = model<IUser>('User', userSchema);
export default User;
