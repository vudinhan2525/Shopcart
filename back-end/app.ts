const express = require('express');
import { MiddleWareFn } from './interfaces/MiddleWareFn';
import globalHandleError from './controller/errorController';
const cors = require('cors');
const userRoute = require('./routes/userRoute');
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
