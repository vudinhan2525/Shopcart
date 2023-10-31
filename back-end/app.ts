const express = require('express');
import { MiddleWareFn } from './interfaces/MiddleWareFn';
const app = express();
app.get('/', <MiddleWareFn>((req, res, next) => {
    res.status(200).send('Hello from the server ??!!!');
}));
app.all('*', <MiddleWareFn>((req, res, next) => {
    res.status(404).json({
        res: "This route can't be found",
    });
}));
module.exports = app;
