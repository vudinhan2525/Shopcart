const express = require('express');
import { MiddleWareFn } from './interfaces/MiddleWareFn';
import globalHandleError from './controller/errorController';
import { Server, Socket } from 'socket.io';
import {
    getChatListForUser,
    addMessage,
    getShopList,
    getChatListForShop,
} from './controller/socketController';
import bodyParser from 'body-parser';
import Conversation from './models/conversationModel';
import User from './models/userModel';
import Shop from './models/shopModel';
const cors = require('cors');
const http = require('http');
const userRoute = require('./routes/userRoute');
const webhookRoute = require('./routes/webhookStripe');
const prodRoute = require('./routes/prodRoute');
const detailProdRoute = require('./routes/detailProdRoute');
const addRoute = require('./routes/addressRoute');
const shopRoute = require('./routes/shopRoute');
const notiRoute = require('./routes/notiRoute');
const billRoute = require('./routes/billRoute');
const ratingRoute = require('./routes/ratingRoute');
const couponRoute = require('./routes/couponRoute');
const searchRoute = require('./routes/searchRoute');
const conversationRoute = require('./routes/convesationRoute');
const messageRoute = require('./routes/messageRoute');
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
app.use('/api/v1/webhook', webhookRoute);
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
app.use('/api/v1/bill', billRoute);
app.use('/api/v1/search', searchRoute);
app.use('/api/v1/conv', conversationRoute);
app.use('/api/v1/msg', messageRoute);
app.get('/', <MiddleWareFn>((req, res, next) => {
    res.status(200).send('Hello from the server ??!!!');
}));
app.all('*', <MiddleWareFn>((req, res, next) => {
    res.status(404).json({
        res: "This route can't be found",
    });
}));
app.use(globalHandleError);
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONT_END_URL,
        methods: ['GET', 'POST'],
    },
});
const mp = new Map();
io.on('connection', async (socket) => {
    console.log('Have someone!!', socket.id);
    socket.on('disconnect', async (reason) => {
        console.log('Disconnect', socket.id);
        const data = mp.get(socket.id);
        mp.delete(socket.id);
        if (data.fromUser) {
            await User.updateOne(
                { _id: data.id },
                { isActive: false, lastActive: Date.now() },
            );
        } else if (data.fromUser === false) {
            await Shop.updateOne(
                { _id: data.id },
                { isActive: false, lastActive: Date.now() },
            );
        }
    });
    socket.on('get-shop-list-from-client', async ({ userShop }) => {
        const response = await getShopList(userShop);
        socket.emit('return-shop-list-from-server', response);
    });
    socket.on(
        'get-chat-list-from-client',
        async (data: { userId: string; fromUser: boolean; shopId: string }) => {
            if (data.fromUser) {
                await User.updateOne(
                    { _id: data.userId },
                    { isActive: true, lastActive: Date.now() },
                );
                mp.set(socket.id, { id: data.userId, fromUser: data.fromUser });
                const response = await getChatListForUser(data.userId);
                socket.emit('return-chat-from-server', response);
            } else if (data.fromUser === false) {
                await Shop.updateOne(
                    { _id: data.shopId },
                    { isActive: true, lastActive: Date.now() },
                );
                mp.set(socket.id, { id: data.shopId, fromUser: data.fromUser });
                const response = await getChatListForShop(data.shopId);
                socket.emit('return-chat-from-server', response);
            }
        },
    );
    socket.on(
        'send-message-from-client',
        async (data: {
            fromUser: boolean;
            convId: string;
            message: string;
        }) => {
            const message = await addMessage(data);
            io.sockets.emit('send-message-from-server', message);
        },
    );
    socket.on(
        'update-seen',
        async (data: { fromUser: boolean; convId: string }) => {
            if (data.fromUser) {
                await Conversation.updateOne(
                    { _id: data.convId },
                    {
                        userSeenAt: Date.now(),
                    },
                );
            } else {
                await Conversation.updateOne(
                    { _id: data.convId },
                    {
                        shopSeenAt: Date.now(),
                    },
                );
            }
            let conv = await Conversation.findById(data.convId);
            io.sockets.emit('return-updateseen-from-server', {
                shopSeenAt: conv?.shopSeenAt,
                convId: data.convId,
                userSeenAt: conv?.userSeenAt,
            });
        },
    );
});
module.exports = server;
