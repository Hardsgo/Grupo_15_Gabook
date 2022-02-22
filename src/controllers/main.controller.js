const booksModel = require('../models/productsModel');
const { validationResult } = require('express-validator');

const controller = {
  //----------------------Index---------------------------//
  getIndex: async function (req, res) {

    console.log('profile')
    console.log(req.session)
    const libros = await booksModel.getBooks();
    console.log(libros)
    return res.render(
      "index", { 
        libros,
        user: req.session.userLogged 
      });
  },

  //----------------------Lista de libros---------------------------//
  getProducts: async function (req, res) {
    const libros = await booksModel.getBooks();
    console.log(libros);
    return res.render("./products/list-of-books", { libros });
  },
  //----------------------Búsqueda---------------------------//
  search: async (req, res) => {
    const textToSearch = req.query.keywords;
    // const result = [];
    const booksFound = await booksModel.searchBook(textToSearch);
    // return console.log(booksFound);
    return res.render("results", { result: booksFound, textToSearch });
  },
  //----------------------Vista detalle de libro---------------------------//
  getProductDetail: async function (req, res) {
    const { id } = req.params;
    // const book = libros.find(libro => libro.id == id);
    // console.log(book);
    console.log(id);
    const book = await booksModel.getBook(id);
    console.log(book);
    return res.render("./products/product-detail", { book, user: req.session.userLogged });
  },

  //----------------------Vista Carrito---------------------------//
  getCart: function (req, res) {
    return res.render("./products/cart", {
      user: req.session.userLogged});
  },

  //--------------------- Vista Crear libro-----------------------//
  getCreateBook: function (req, res) {
    return res.render("./products/create-book");
  },

  //---------------------Crear libro ------------------------//
  createBook: function (req, res) {
    let image = !req.file ? "GenericUserImage.png" : req.file.filename; // agregar imagen generica para libros
    const newBook = {
      id: null,
      ...req.body,
      image,
    };
    // return console.log(newBook);

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("./products/create-book", {
        errors: errors.mapped(),
        oldData: req.body,
      });
    } else {
      booksModel.createBook(newBook)
      // Redirigiendo a la pagina
      .then(res.redirect("/products"));
    }
    
  },

  //----------------------Vista Modificar Libro---------------------------//
  getUpdateBook: async function (req, res) {
    const { id } = req.params;
    const oldBook = await booksModel.getBook(id);
    // console.log(oldBook);
    return res.render("./products/edit-book", { oldBook });
  },

  //----------------------Modificar Libro---------------------------//
  updateBook: async function (req, res) {
    const { id } = req.params;
    const oldBook = await booksModel.getBook(id);
    const bookEdited = {
      id: oldBook.id,
      ...req.body,
      image: (!req.file) ? oldBook.image : req.file.filename
    };
    // return console.log(bookEdited);
    // console.log(bookEdited);
    booksModel.updateBook(bookEdited);
    // res.redirect("/");
    return res.redirect("/products");
  },

  //----------------------Eliminar Libro---------------------------//
  deleteBook: async function (req, res) {
    const { id } = req.params;
    await booksModel.deleteBook(id);
    console.log(id);
    // res.redirect("/");
    return res.redirect("/products");
  },

  //----------------------Admin Products---------------------------//
  getAdminProducts: function (req, res) {
    return res.render("adminProducts");
  },
};

module.exports = controller;
