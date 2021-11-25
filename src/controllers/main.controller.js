const booksModel = require("../models/librosModel.js");

const libros = booksModel.getBooks();

//crear un ID
let createId = () => {
  let ID = 0;
  booksModel.getBooks().forEach((book, index) => {
    if (book.id == ID) {
      ++ID;
    } else {
      ID;
    }
  });
  return ID;
};

const controller = {
  getIndex: function (req, res) {
    res.render("index", { libros: booksModel.getBooks() });
  },

  getProducts: function (req, res) {
    res.render("./products/list-of-books", { libros: booksModel.getBooks() });
  },

  
  search: (req, res) => {
    const textToSearch = req.query.keywords;
    const result = [];
    booksModel.getBooks().forEach((book) => {
      let lowerBook = book.title.toLowerCase();
      if (lowerBook.includes(textToSearch.toLowerCase())) {
        result.push(book);
      }
    });
    // console.log(textToSearch);
    res.render("results", { result, textToSearch });
  },
  getProductDetail: function (req, res) {
    const { id } = req.params;
    // const book = libros.find(libro => libro.id == id);
    // console.log(book);
    res.render("./products/product-detail", { book: booksModel.getBook(id) });
  },
  getCart: function (req, res) {
    res.render("./products/cart");
  },
  getSignIn: function (req, res) {
    res.render("./users/sign-in");
  },
  getLogin: function (req, res) {
    res.render("./users/login");
  },
  getCreateBook: function (req, res) {
    res.render("./products/create-book");
  },
  createBook: function (req, res) {
    const id = createId();
    const newBook = {
      id,
      ...req.body,
    };
    console.log(newBook);
    booksModel.createBook(newBook);
    // Redirigiendo a la pagina
    res.redirect("/products");
  },
  getUpdateBook: function (req, res) {
    const { id } = req.params;
    
    const oldBook = booksModel.getBooks().find((book) => book.id == id);
    // console.log (oldBook)
    res.render("./products/edit-book", { oldBook });
  },
  updateBook: function (req, res) {
    const { id } = req.params;
    const oldBook = booksModel.getBooks().find((book) => book.id == id);
    const bookEdited = {
      id: oldBook.id,
      isbn: oldBook.isbn,
      ...req.body,
      image: oldBook.image,
    };
    console.log(bookEdited);
    booksModel.updateBook(bookEdited);
    // res.redirect("/");
    res.redirect("/products");
  },
  deleteBook: function (req, res) {
    const { id } = req.params;
    booksModel.deleteBook(id);
    console.log(id);
    // res.redirect("/");
    res.redirect("/products");
  },
  getAdminProducts: function (req, res) {
    res.render("adminProducts");
  },
};

module.exports = controller;
