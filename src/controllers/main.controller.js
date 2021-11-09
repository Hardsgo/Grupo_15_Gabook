// const fs = require('fs');
// const path = require('path');
// const model = require('../models/libros.json')
const libros = require('../models/libros.js');


const controller = {
    getIndex : function(req, res) {
        res.render('index', {libros});
    },
    getProductDetail : function(req, res) {
        const {id} = req.params;
        const book = libros.find(libro => libro.id == id);
        console.log(book);
        res.render('./products/product-detail', {book});
    },
    getCart : function(req, res) {
        res.render('./products/cart');
    },
    getSignIn : function(req, res) {
        res.render('./users/sign-in');
    },
    getLogin : function(req, res) {
        res.render('./users/login');
    },
    adminProducts : function(req, res){
        res.render('./users/adminProducts');
    },
    /* createBook : function(req, res){
        const libroAdded = {
            id : req.body.id,
            title : req.body.title,
            author : req.body.author,
            editorial : req.body.editorial,
            year : req.body.year,
            language : req.body.language,
            genre : req.body.genre,
            price : parseInt(req.body.price),
            discount : parseInt(req.body.discount),
            isbn : req.body.isbn,
            description : req.body.description,
            image : req.body.image
        }
        //Leer JSON del modelo, guardarlo en variable como objeto
        // const model = JSON.parse(fs.readFileSync(path.join(__dirname, '../models/libros.json'), 'utf-8'), null, 4);
        //Agregar el libro agregado al objeto modelo
        model.push(libroAdded);
        //Convertir model a objeto JSON
        const modelJSON = JSON.stringify(model, null, 4);
        //Escribir el archivo JSON
        fs.writeFileSync(path.join(__dirname,'../models/libros.json'), modelJSON, function(err){
            console.log('Añadido');
        });
        //Redirigiendo a la pagina

        res.redirect('/addBook');
    }, */
    getAdminProducts : function(req, res) {
        res.render('adminProducts');
    }
}

module.exports = controller;