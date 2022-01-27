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
      console.log(allBooks)
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
  }
}

module.exports = booksModel;

// booksModel.exists(1);
// booksModel.getBooks();
// booksModel.createBook(
//     {
//         id: null,
//         title: "El Diario de Ana Frank",
//         description: "Lorem ipsum dolor sit amet consectetur apisicing elit. Numquam, ducimus magnam. Adipisci neque minus ut? Qui dolore illum tempora amet. Ipsam unde inventore ut harum tenetur corrupti praesentium tempora doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatem amet ratione qui, accusantium blanditiis iusto vitae earum, quaerat nemo est illo ab maiores eius architecto, esse exercitationem quos harum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis corrupti inventore iusto adipisci eaque at qui nemo excepturi aliquam, itaque alias delectus sit maiores laboriosam harum obcaecati, laborum vol",
//         isbn: "456789-1",
//         year: "2021",
//         author: "Ana Frank",
//         price: 50000,
//         discount: 30,
//         image: "El-Diario-de-Ana-Frank..jpg",
//         languages_id: 1,
//         genres_id: 2
//     }
// );

// booksModel.updateBook({
//         id: 6,
//         title: "El Diario de Ana Frank",
//         description: "Lorem ipsum dolor sit amet consectetur apisicing elit. Numquam, ducimus magnam. Adipisci neque minus ut? Qui dolore illum tempora amet. Ipsam unde inventore ut harum tenetur corrupti praesentium tempora doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatem amet ratione qui, accusantium blanditiis iusto vitae earum, quaerat nemo est illo ab maiores eius architecto, esse exercitationem quos harum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis corrupti inventore iusto adipisci eaque at qui nemo excepturi aliquam, itaque alias delectus sit maiores laboriosam harum obcaecati, laborum vol",
//         isbn: "456789-1",
//         year: "1986",
//         author: "Ana Frank",
//         price: 40000,
//         discount: 30,
//         image: "El-Diario-de-Ana-Frank..jpg",
//         languages_id: 1,
//         genres_id: 2
//     });

// booksModel.deleteBook(3);

// booksModel.searchBook('da')
