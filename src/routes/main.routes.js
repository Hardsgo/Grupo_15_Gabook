const { Router } = require('express');
const router = Router();
const { main } = require('../controllers/')

router.get('/', main.getIndex);
router.get('/search', main.search);
router.get('/login', main.getLogin);
router.get('/productDetail/:id', main.getProductDetail);
router.get('/signIn', main.getSignIn);
router.get('/cart', main.getCart);
//Create
router.get('/create-book', main.getCreateBook);
router.post('/create-book', main.createBook);
//Update
router.get('/edit-book/:id', main.getUpdateBook);
router.put('/edit-book/:id', main.updateBook);
router.delete('/:id', main.deleteBook);
router.get('/adminProducts', main.getAdminProducts);

module.exports = router;