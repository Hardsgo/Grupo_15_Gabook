const booksModel = require ('../model/booksModel.js')

const controller = {
    getIndex : function(req, res) {
        res.render('index', {libros: booksModel.getBooks()});
    },
    getProductDetail : function(req, res) {
        const {id} = req.params;
        // const book = libros.find(libro => libro.id == id);
        // console.log(book);
        res.render('./products/product-detail', {book: booksModel.getBook(id)});
    },
    getCart : function(req, res) {
        res.render('./products/cart');
    },
    getSignIn : function(req, res) {
        res.render('./users/sign-in');
    },
    getLogin : function(req, res) {
        res.render('./users/login');
    }
    ,
    getAdminProducts : function(req, res) {
        res.render('adminProducts');
    }
}

module.exports = controller;