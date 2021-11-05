const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/main.controller')

router.get('/', controller.getIndex);

router.get('/login', controller.getLogin);

router.get('/productDetail', controller.getProductDetail);

router.get('/signIn', controller.getSignIn);

router.get('/cart', controller.getCart);

module.exports = router;