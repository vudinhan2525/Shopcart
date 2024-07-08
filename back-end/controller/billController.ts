import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Bill from '../models/billModel';
import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import Stripe from 'stripe';
import { gzip, gunzip } from 'zlib';
import { promisify } from 'util';
const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
exports.addBill = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const { status, method, products } = req.body.data;
    const data = await Bill.create({
        status,
        method,
        products: {
            product: products.product,
            quantity: products.quantity || 1,
            price: products.price,
        },
    });
    const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { bill: { $each: [data._id], $position: 0 } } },
        { new: true },
    );
    res.status(200).json({
        status: 'success',
    });
}));
exports.getAllBill = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await User.findById(req.params.userId).populate('bill');

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }

    res.status(200).json({
        status: 'success',
        data: user.bill,
    });
}));
exports.getStripe = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    // Compress the metadata
    const compressedMetadata = await gzipAsync(JSON.stringify(req.body.data));

    // Encode the compressed metadata in Base64
    const encodedMetadata = compressedMetadata.toString('base64');

    const session = await stripe.checkout.sessions.create(
        {
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd', // Adjust currency as needed
                        product_data: {
                            name: 'Shopcart Payment',
                            description: 'Process payment for product.',
                            images: [
                                'https://shopcartimg2.blob.core.windows.net/shopcartctn/halong.jpg',
                            ],
                        },
                        unit_amount: req.body.data.products.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONT_END_URL}/setting/invoice`,
            cancel_url: `${process.env.FRONT_END_URL}`,
            customer_email: 'vudinhan000@gmail.com',
            metadata: {
                data: encodedMetadata,
            },
        },
        {
            apiKey: process.env.STRIPE_SECRET_KEY,
        },
    );
    res.status(200).json({
        status: 'success',
        data: session,
    });
}));
exports.successStripe = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    let event: Stripe.Event | undefined;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            req.headers['stripe-signature'] as string,
            process.env.STRIPE_WEBHOOK_SECRET_KEY as string,
        );
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            status: 'failed',
        });
    }
    if (!event) {
        return res.status(400).json({
            status: 'failed',
        });
    }
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            const encodedMetadata = session.metadata?.data;
            if (encodedMetadata) {
                const metadataBuffer = Buffer.from(encodedMetadata, 'base64');
                const compressedMetadata = await gunzipAsync(metadataBuffer);
                const decodedMetadata = JSON.parse(
                    compressedMetadata.toString(),
                );
                const { status, method, products, userId } = decodedMetadata;
                const data = await Bill.create({
                    status,
                    method,
                    products: {
                        product: products.product,
                        quantity: products.quantity || 1,
                        price: products.price,
                    },
                });
                const user = await User.findByIdAndUpdate(
                    userId,
                    { $push: { bill: { $each: [data._id], $position: 0 } } },
                    { new: true },
                );
                if (!user) {
                    return res.status(400).json({
                        status: 'failed',
                    });
                }
                const result = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { products: { productId: products.product } } },
                    { new: true },
                );
                if (!result) {
                    return res.status(400).json({
                        status: 'failed',
                    });
                }
                return res.status(200).json({
                    status: 'success',
                    user: result,
                });
            } else {
                return res.status(400).json({
                    status: 'failed',
                    message: 'No metadata found',
                });
            }
        default:
            console.log(`Unhandled event type: ${event.type}`);
            return res.status(400).json({
                status: 'failed',
                message: `Unhandled event type: ${event.type}`,
            });
    }
}));
