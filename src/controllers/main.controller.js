// const libros = [
//     {
//         "id" : 0,
//         "title" : "Cien Años de Soledad",
//         "author" : "Gabriel García Márquez",
//         "editorial" : "Editorial Gabo",
//         "price" : 100000,
//         "image" : "cien-anos-de-soledad.gif"
//     },
//     {
//         "id" : 4,
//         "title" : "El Código Da Vinci",
//         "author" : "Dan Brown",
//         "editorial" : "Editorial Gabo",
//         "price" : 120000,
//         "image" : "Codigo-da-Vinci.jpg"
//     },
//     {
//         "id" : 7,
//         "title" : "El Cuervo",
//         "author" : "Edgar Allan Poe",
//         "editorial" : "Editorial Gabo",
//         "price" : 99000,
//         "image" : "el-cuervo.jpeg"
//     },
//     {
//         "id" : 10,
//         "title" : "El Diario de Ana Frank",
//         "author" : "Ana Frank",
//         "editorial" : "Editorial Gabo",
//         "price" : 80000,
//         "image" : "El-Diario-de-Ana-Frank..jpg"
//     },
//     {
//         "id" : 12,
//         "title" : "El Señor de las Moscas",
//         "author" : "William Golding",
//         "editorial" : "Editorial Gabo",
//         "price" : 40000,
//         "image" : "El-Señor-de-las-Moscas.jpg"
//     },
//     {
//         "id" : 15,
//         "title" : "Harry Potter y la Piedra Filosofal",
//         "author" : "J. K. Rowling",
//         "editorial" : "Editorial Gabo",
//         "price" : 70000,
//         "image" : "Harry-Potter-y-la-piedra-filosofal.jpg"
//     },
//     {
//         "id" : 17,
//         "title" : "La Teoría del Caos",
//         "author" : "Alberto Pérez Izquierdo",
//         "editorial" : "Editorial Gabo",
//         "price" : 60000,
//         "image" : "la-teoria-del-caos.jpg"
//     },
//     {
//         "id" : 23,
//         "title" : "Los Viajes de Gulliver",
//         "author" : "Jonathan Swift",
//         "editorial" : "Editorial Gabo",
//         "price" : 40000,
//         "image" : "Los-viajes-de-Gulliver-Jonathan-Swift.jpg"
//     }
// ]
const fs = require('fs');
const path = require('path');
const model = require('../models/libros.json')
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
    getAddBook : function(req, res){
        res.render('./users/add-book');
    },
    createBook : function(req, res){
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
    }
}

module.exports = controller;