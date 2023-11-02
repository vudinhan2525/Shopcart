import catchAsync from '../utils/catchAsync';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import User from '../models/userModel';
import IUser from '../interfaces/IUser';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN,
    });
};
const sendJsonToken = (
    user: IUser,
    statusCode: number,
    req: Request,
    res: Response,
) => {
    const token = signToken(user._id);
    const expir = parseInt(process.env.JWT_COOKIE_EXPIRE_IN as string) || 1;

    const cookieOptions = {
        expires: new Date(Date.now() + expir * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            _id: user._id,
        },
    });
};
exports.login = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        // handle Error
    }
    const user = await User.findOne({ email: email }).select('password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        // handle Error
    }
    sendJsonToken(user as IUser, 200, req, res);
}));
