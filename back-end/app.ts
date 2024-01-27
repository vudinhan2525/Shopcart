const express = require('express');
import { MiddleWareFn } from './interfaces/MiddleWareFn';
import globalHandleError from './controller/errorController';
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const prodRoute = require('./routes/prodRoute');
const detailProdRoute = require('./routes/detailProdRoute');
const addRoute = require('./routes/addressRoute');
const shopRoute = require('./routes/shopRoute');
const notiRoute = require('./routes/notiRoute');
const ratingRoute = require('./routes/ratingRoute');
const couponRoute = require('./routes/couponRoute');
const cookieParse = require('cookie-parser');
const app = express();
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    }),
);

app.use(cookieParse());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/users', userRoute);
app.use('/api/v1/prods', prodRoute);
app.use('/api/v1/detailprods', detailProdRoute);
app.use('/api/v1/noti', notiRoute);
app.use('/api/v1/shop', shopRoute);
app.use('/api/v1/address', addRoute);
app.use('/api/v1/rating', ratingRoute);
app.use('/api/v1/coupon', couponRoute);
app.get('/', <MiddleWareFn>((req, res, next) => {
    res.status(200).send('Hello from the server ??!!!');
}));
app.all('*', <MiddleWareFn>((req, res, next) => {
    res.status(404).json({
        res: "This route can't be found",
    });
}));
app.use(globalHandleError);
module.exports = app;
