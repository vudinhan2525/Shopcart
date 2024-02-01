export {};
const express = require('express');
const searchController = require('../controller/searchController');

const router = express.Router();
router.get('/searchFuzzy/:keyword', searchController.searchFuzzy);
router.get('/searchShop/:keyword', searchController.searchShop);
// router.get(
//     '/searchAutoCompleted/:keyword',
//     searchController.searchAutoCompleted,
// );
module.exports = router;
