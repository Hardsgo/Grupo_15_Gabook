const usersModel = require("../../models/usersModel.js");
const booksModel = require("../../models/productsModel");



const apiController = {
  getUsersApi: async (req, res) => {
    try {
      const result = await usersModel.getUsers();
      let users = [];
      result.forEach((user) =>
        users.push({
          id: user.id,
          user_name: user.name,
          user_email: user.email,
          user_role: user.role,
          user_url_detail: `https://gabook.herokuapp.com/api/user/${user.id}`,
        })
      );
      res.status(200).json({count: result.length, users:users });
    } catch (error) {
      res.status(404).json("No se encontraron datos");
      //   console.log(error);
    }
  },

  getUserApi: async function (req, res) {
    try {
      const user = await usersModel.getUserDetail(req.params.id);
      let userImage = user.image;
      const user_detail = {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        image: `https://gabook.herokuapp.com/images/users/${userImage}`,
      };
      res.status(200).json(user_detail);
    } catch (error) {
      res.status(404).json("No se encontraron datos");
      //   console.log(error);
    }
  },

  getProductsApi: async function (req, res) {
    try {
      const result = await booksModel.getBooks();
      //Categorías o generos
      const genreLength = (genre) => {
        let totalGenre = 0;
        result.forEach(oneGenre => (oneGenre.genres_id == genre) ? totalGenre++: null);
        return totalGenre;
      }
      // console.log(genreLength(7));

      let countByCategory = {
        accion: genreLength(1),
        romance: genreLength(2),
        aventura: genreLength(3),
        suspenso: genreLength(4),
        terror: genreLength(5),
        biografia: genreLength(6),
        literatura: genreLength(7),
        cientifico: genreLength(8),
        ciencia_ficcion: genreLength(9),
        fantastica: genreLength(10)
      }
      // console.log(countByCategory);



      // console.log(result);
      //Libros con todo y detalles
      let books = [];
      result.forEach((book) =>
        books.push({
          id: book.id,
          title: book.title,
          description: book.description,
          genre: book.genre,
          author:book.author,
          detail: `https://gabook.herokuapp.com/api/products/${book.id}`
        })
      );
      
      res.status(200).json({ count: result.length  ,  countByCategory ,  books } );
    } catch (error) {
      res.status(404).json("No se encontraron datos");
      //   console.log(error);
    }
  },

  getProductApi: async function(req, res){
    try {
      const result = await booksModel.getBook(req.params.id);
      const url_image = result.image;
      let book = {
        ...result,
        url_image: `https://gabook.herokuapp.com/images/${url_image}`
      }
      delete book.languages_id;
      delete book.genres_id;

      console.log(book);

      res.status(200).json( book );
    } catch (error) {
      res.status(404).json("No se encontraron datos");
    }
  }

};

module.exports = apiController;
