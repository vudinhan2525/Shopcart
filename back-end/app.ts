const express = require('express');
import { MiddleWareFn } from './interfaces/MiddleWareFn';
import globalHandleError from './controller/errorController';
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const app = express();
app.use(cors());
app.options('*', cors());
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
