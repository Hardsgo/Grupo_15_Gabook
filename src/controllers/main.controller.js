const controller = {
    getIndex : function(req, res) {
        res.render('index');
    },
    getProductDetail : function(req, res) {
        res.render('./products/product-detail');
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