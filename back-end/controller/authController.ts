import catchAsync from '../utils/catchAsync';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import User from '../models/userModel';
import IUser from '../interfaces/IUser';
import { Request, Response } from 'express';
import AppError from '../utils/AppError';
const crypto = require('crypto');
const mail = require('../utils/mail');
const { promisify } = require('util');
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
        //httpOnly: true,
    };
    res.cookie('jwt', token, {
        ...cookieOptions,
    });
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
        return next(new AppError('Please provide email and password !!!', 400));
    }
    const user = await User.findOne({ email: email }).select('password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Email or password is incorrect!', 401));
    }
    sendJsonToken(user as IUser, 200, req, res);
}));
exports.signup = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const { email, password, passwordConfirm } = req.body;
    if (!email || !password || !passwordConfirm) {
        return next(new AppError('Please provide information !!!', 400));
    }
    const user = await User.findOne({ email: email });
    if (user) {
        return next(
            new AppError('Email has been used in another account !!', 400),
        );
    }
    const newUser = await User.create({
        name: req.body.name || 'User',
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role || 'user',
    });
    sendJsonToken(newUser as IUser, 200, req, res);
}));
exports.protect = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    let token;
    //1) Check if token is exists
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new AppError('Please login !!!', 401));
    }
    //2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3) Check if user still exists
    const curUser = await User.findOne({ _id: decoded.id });
    if (!curUser) {
        return next(new AppError('User not exists !!!', 400));
    }

    //4) Check if user changed password
    if (curUser.verifyPasswordChanged(decoded.iat)) {
        return next(
            new AppError(
                'User recently changed password, please try again',
                401,
            ),
        );
    }
    req.user = curUser;
    res.locals.user = curUser;
    next();
}));
exports.forgotPassword = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    //1) Get user based on email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("Can't find user with this email !!", 400));
    }
    //2) Generate random reset token
    const token = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    //3) Send it to user's email
    const url = `${process.env.FRONT_END_URL}/register/${token}`;

    try {
        await mail.sendMail(req.body.email, 'Reset your password', url);
        // Email sent successfully
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        // Handle error and respond to the user
        user.passwordResetExpires = undefined;
        user.passwordResetToken = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(500).json({ error: 'Failed to send email' });
    }
}));
exports.resetPassword = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    //1) Get user based on token
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    console.log(hashedToken);
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    //2) Check and set new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired!!', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    //3) Update passwordchangeat property for user
    await user.save();
    //4) Send back token for user
    sendJsonToken(user, 200, req, res);
}));
exports.updatePassword = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await User.findById(req.user?._id).select('+password');
    if (!user) {
        return next(new AppError("User doesn't exits !!!", 400));
    }
    if (!(await user.correctPassword(req.body.password, user.password))) {
        return next(new AppError('Password is not correct !!!', 400));
    }
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    user.save();
    sendJsonToken(user, 200, req, res);
}));
exports.isLoggedIn = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    if (req.cookies.jwt) {
        jwt.verify(
            req.cookies.jwt,
            process.env.JWT_SECRET,
            async (err: any, result: any) => {
                if (err) {
                    res.status(400).json({
                        status: 'failed',
                        message: 'Invalid token',
                    });
                    return;
                } else {
                    const user = await User.findOne({ _id: result.id });
                    // Check if user still exists and check if user changed password
                    if (!user || user.verifyPasswordChanged(result.iat)) {
                        res.status(400).json({
                            status: 'failed',
                            message: 'Invalid token',
                        });
                        return;
                    }
                    res.status(200).json({
                        status: 'success',
                    });
                    return;
                }
            },
        );
    } else {
        res.status(200).json({
            status: 'loginfirsttime',
        });
    }
}));
