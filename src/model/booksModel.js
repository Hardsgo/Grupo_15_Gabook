const dbBooks = require("./books.json");
const fs = require("fs");
const path = require("path");

booksModel = {
  getBooks: function () {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, "./books.json")));
  },

  getBook: function (id) {
    const book = this.getBooks().find((libro) => libro.id == id);
    return book;
  },

  createBook: function ( book) {
    const newBooks =  this.getBooks();
    newBooks.push(book);
    fs.writeFileSync(
        path.resolve(__dirname, "./books.json"),
        JSON.stringify(newBooks, null, 4),
        { encoding: "utf8" }
      );
  },
};

module.exports = booksModel;



