import { Collection } from 'mongoose';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Product from '../models/productModel';
import catchAsync from '../utils/catchAsync';
import Shop from '../models/shopModel';
const diacritic = require('diacritic');
const { MongoClient } = require('mongodb');

exports.searchFuzzy = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    // const client = new MongoClient(
    //
    // );
    // const db = client.db('shopcart');
    // const collection = db.collection('products');
    // const pipeline = [];
    // pipeline.push({
    //     $search: {
    //         index: 'search_product',
    //         text: {
    //             query: req.params.keyword,
    //             path: ['name', 'summary'],
    //             fuzzy: {},
    //         },
    //     },
    // });
    // pipeline.push({
    //     $project: {
    //         _id: 0,
    //         score: { $meta: 'searchScore' },
    //         name: 1,
    //         summary: 1,
    //     },
    // });
    // const result = await collection.aggregate(pipeline);
    // const array = await result.toArray();
    const keyword = req.params.keyword;

    // Using MongoDB text search with $text operator
    const products = await Product.find({
        $text: { $search: keyword },
    });

    res.status(200).json({
        status: 'success',
        data: products,
    });
}));
exports.searchShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const keyword = req.params.keyword;
    const products = await Shop.find({
        $text: { $search: keyword },
    });
    res.status(200).json({
        status: 'success',
        data: products,
    });
}));
// Just for english product
// exports.searchAutoCompleted = catchAsync(<MiddleWareFn>(async (
//     req,
//     res,
//     next,
// ) => {
//     const client = new MongoClient(
//
//     );
//     const db = client.db('shopcart');
//     const collection = db.collection('products');
//     const pipeline = [];
//     pipeline.push({
//         $search: {
//             index: 'autocompleted_product',
//             autocomplete: {
//                 query: req.params.keyword,
//                 path: 'name',
//                 tokenOrder: 'sequential',
//             },
//         },
//     });
//     const result = await collection.aggregate(pipeline);
//     const array = await result.toArray();
//     res.status(200).json({
//         status: 'success',
//         data: array,
//     });
// }));
