const express = require('express');
const router = express.Router();
const controller = require('../controllers/main.controller')

router.get('/', controller.getIndex);
router.get('/login', controller.getLogin);
router.get('/productDetail/:id', controller.getProductDetail);
router.get('/signIn', controller.getSignIn);
router.get('/cart', controller.getCart);
router.get('/addBook', controller.adminProducts);
router.post('/addBook', controller.createBook);

module.exports = router;