const db = require("../database/models");
const { Op } = require("sequelize");  


const booksModel = {
  //-------------------Mirar si el id existe-----------------------//
  exists: async function (id) {
    try {
      const found = await db.products.findByPk(id);
    // console.log(found ? true : false);
      return found ? true : false;  
    } catch (error) {
      return ("Ocurrió un error " + error);
    } 
  },
  //---------------------Buscar todos los libros-------------------------//
  getBooks: async function () {
    try {
      const allBooks = await db.products.findAll({
        include: [
          { model: db.genres, as: 'genre'},
          { model: db.languages, as: 'language'}
        ]
      });
      // const allBooks = await db.Products.findAll();
      // console.log(allBooks.map(book =>  book.dataValues));
      // console.log(allBooks)
      // return JSON.stringify(allBooks, null, 4);
      return allBooks.map(book =>  book.dataValues);
    } catch (error) {
      return ("Ocurrió un error " + error);
    }
  },
//-------------------------Buscar un libro---------------------------//
  getBook: async function (id) {
    try {
      const book = await db.products.findOne({
        include: [
          { model: db.genres, as: 'genre'},
          { model: db.languages, as: 'language'}
        ],
          where: {
              id
          }
      });
      // console.log(book);
      return { 
        ...book.dataValues, 
        genre: book.genre.dataValues.name,
        language: book.language.dataValues.name,
      };
      
    } catch (error) {
      return ("Ocurrió un error " + error);
    }
  },
  //-----------------------Crear libro--------------------//
  createBook: async function (newBook) {
    try {
      const bookCreated = await db.products.create(newBook);
      console.log(`El libro ${bookCreated.title} fue reado satisfactoriamente.`);
      return "Creado satisfactoriamente.";
    } catch (error) {
      return ("Ocurrió un error " + error);
    }
  },
//--------------------Actualizar libro-----------------------------//
  updateBook: async function (bookEdited) {
    try {
      const bookUpdated = await db.products.update({
        ...bookEdited,
      },
      {
        where: {id: bookEdited.id}
      });
  
      return `El libro ${bookUpdated.title} ha sido modificado`;

    } catch (error) {
      return ("Ocurrió un error " + error);
    }
  },

  //------------------------Eliminar libro----------------------------//
  deleteBook: async function (id) {
    try {
      await db.products.destroy({
        where: { id }
      });
      return "Libro eliminado";
    } catch (error) {
      return ("Ocurrió un error " + error);
    }
  },
  //------------------Buscar libro segun titulo y autor--------------------//
  searchBook: async (text) => {
    try {
      const bookFound = await db.products.findAll({
        where: {
          [ Op.or ] : [{ 
              title: {
                [ Op.substring ]: text
              }
            }, 
            {
              author: {
                [ Op.substring ]: text
              } 
            }]
        }
      })
      // console.log(bookFound);
      const searchedBook = bookFound.map(book => {return book.dataValues});
      // console.log(searchedBook);
      return searchedBook;
    } catch (error) {
      return ("Ocurrió un error " + error);
    }
  },
  //------------------Géneros--------------------//
  getGenres : async () => {
    try {
      const allGenres = await db.genres.findAll();
      const genres = allGenres.map( genre => genre.dataValues.name )
      // console.log(genres);
      return genres;
    } catch (error) {
      return ("Ocurrió un error " + error);
    }
  },
  //------------------Paginación de libros--------------------//
  paginationBooks : async function (page, size){
    try {
      let books = await db.products.findAndCountAll({
        include: [
          { model: db.genres, as: 'genre'},
          { model: db.languages, as: 'language'}
        ],
        limit: size,
        offset: page * size
      });

      const content = books.rows.map(book => book.dataValues);
      // console.log(books);
      const booksPages = {
        total_books: books.count,
        total_pages: Math.ceil(books.count / size),
        content
      }
      // console.log(booksPages);
      
      return booksPages;
    } catch (error) {
      return console.log(error);
    }
  }
}

module.exports = booksModel;

// booksModel.paginationBooks(0, 2);
