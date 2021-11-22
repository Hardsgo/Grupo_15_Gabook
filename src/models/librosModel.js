const fs = require('fs');
const path = require('path');


const booksModel = {
    //Mirar si el id existe
    exists : function(id){
        const found = this.getBooks().find(book => book.id == id);
        return found ? true : false;
    },
    //Escribir el nuevo archivo JSON
    writeBookList : function(bookList){
        fs.writeFileSync(path.resolve(__dirname, './libros.json'), JSON.stringify(bookList, null, 4), {encoding : 'utf-8'});
    },
    getBooks : function() {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, './libros.json'), {encoding: 'utf-8'}));
    },
    createBook : function(newBook) {
        let books = this.getBooks()
        if(this.exists(newBook.id)) return 'Libro ya existe';
        books.push(newBook);
        this.writeBookList(books);
        return "Creado satisfactoriamente."
    },
    updateBook: function (bookEdited){
        const bookIndex = this.getBooks().findIndex(book => book.id == bookEdited.id);
        if(bookIndex < 0) return "No existe este libro en la base de datos";
        let newDb = this.getBooks();
        newDb[bookIndex]=bookEdited;
        this.writeBookList(newDb);
        return "Actualizado con éxito"
    },
    deleteBook: function (id) {
        if (!this.getBooks()) return 'La base de datos está vacía';

        if (this.exists(id)) {
            const newDb = this.getBooks().filter(item => item.id != id);
            this.writeBookList(newDb);
            return ('Libro eliminado');
        } else {
            return 'El libro no se encuentra en la base de datos';
        }
    }
}

module.exports = booksModel;
