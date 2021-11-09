const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/login.html'));
});

router.get('/product-detail', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/product-detail.html'));
});

router.get('/sign-in', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/sign-in.html'));
});

router.get('/cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/cart.html'));
});

router.get('/adminProdcuts', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/adminProducts.html'));
});

module.exports = router;