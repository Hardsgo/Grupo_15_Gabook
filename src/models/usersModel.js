const fs = require("fs");
const path = require("path");

const usersModel = {
  //Mirar si el id existe
  exists: function (id) {
    const found = this.getUsers().find((user) => user.id == id);
    return found ? true : false;
  },
  //Escribir el nuevo archivo JSON
  writeUsersList: function (usersList) {
    fs.writeFileSync(
      path.resolve(__dirname, "../data/users.json"),
      JSON.stringify(usersList, null, 4),
      { encoding: "utf-8" }
    );
  },
  getUsers: function () {
    return JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../data/users.json"), {
        encoding: "utf-8",
      })
    );
  },

  getUser: function (id) {
    const user = this.getUsers().find((item) => item.id == id);
    return user;
  },

  createUser: function (newUser) {
    let users = this.getUsers();
    if (this.exists(newUser.id)) return "Usuario ya existe";
    users.splice(newUser.id, 0, newUser);
    this.writeUsersList(users);
    return "Creado satisfactoriamente.";
  },
//   updateBook: function (bookEdited) {
//     const bookIndex = this.getBooks().findIndex(
//       (book) => book.id == bookEdited.id
//     );
//     if (bookIndex < 0) return "No existe este libro en la base de datos";
//     let newDb = this.getBooks();
//     newDb[bookIndex] = bookEdited;
//     this.writeBookList(newDb);
//     return "Actualizado con éxito";
//   },
//   deleteBook: function (id) {
//     if (!this.getBooks()) return "La base de datos está vacía";

//     if (this.exists(id)) {
//       const newDb = this.getBooks().filter((item) => item.id != id);
//       this.writeBookList(newDb);
//       return "Libro eliminado";
//     } else {
//       return "El libro no se encuentra en la base de datos";
//     }
//   },
};

module.exports = usersModel;
