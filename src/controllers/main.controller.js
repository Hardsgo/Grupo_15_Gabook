const libros = [
    {
        "id" : 0,
        "title" : "Cien Años de Soledad",
        "editorial" : "Editorial Gabo",
        "price" : 100000,
        "image" : "cien-anos-de-soledad.gif"
    },
    {
        "id" : 4,
        "title" : "El Código Da Vinci",
        "editorial" : "Editorial Gabo",
        "price" : 120000,
        "image" : "Codigo-da-Vinci.jpg"
    },
    {
        "id" : 7,
        "title" : "El Cuervo",
        "editorial" : "Editorial Gabo",
        "price" : 99000,
        "image" : "el-cuervo.jpeg"
    },
    {
        "id" : 10,
        "title" : "El Diario de Ana Frank",
        "editorial" : "Editorial Gabo",
        "price" : 80000,
        "image" : "El-Diario-de-Ana-Frank..jpg"
    },
    {
        "id" : 12,
        "title" : "El Señor de las Moscas",
        "editorial" : "Editorial Gabo",
        "price" : 40000,
        "image" : "El-Señor-de-las-Moscas.jpg"
    },
    {
        "id" : 15,
        "title" : "Harry Potter y la Piedra Filosofal",
        "editorial" : "Editorial Gabo",
        "price" : 70000,
        "image" : "Harry-Potter-y-la-piedra-filosofal.jpg"
    },
    {
        "id" : 17,
        "title" : "La Teoría del Caos",
        "editorial" : "Editorial Gabo",
        "price" : 60000,
        "image" : "la-teoria-del-caos.jpg"
    },
    {
        "id" : 23,
        "title" : "Los Viajes de Gulliver",
        "editorial" : "Editorial Gabo",
        "price" : 40000,
        "image" : "Los-viajes-de-Gulliver-Jonathan-Swift.jpg"
    }
]

const controller = {
    getIndex : function(req, res) {
        res.render('index', {libros});
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
}

module.exports = controller;