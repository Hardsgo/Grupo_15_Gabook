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

  getUserByMail: function (mail) {
    const user = this.getUsers().find((item) => item.loginMail == mail);
    return user;
  },

  getUserByName: function (name) {
    const user = this.getUsers().find((item) => item.name == name);
    return user;
  },

  createUser: function (newUser) {
    let users = this.getUsers();
    if (this.exists(newUser.id)) return "Usuario ya existe";
    users.splice(newUser.id, 0, newUser);
    this.writeUsersList(users);
    return "Creado satisfactoriamente.";
  },
  updateUser: function (UserEdited) {
    const UserIndex = this.getUsers().findIndex(
      (user) => user.id == UserEdited.id
    );
    if (UserIndex < 0) return "No existe este Usuario en la base de datos";
    let newDb = this.getUsers();
    newDb[UserIndex] = UserEdited;
    this.writeUsersList(newDb);
    return "Actualizado con éxito";
  },
  deleteUser: function (id) {
    if (!this.getUsers()) return "La base de datos está vacía";

    if (this.exists(id)) {
      const newDb = this.getUsers().filter((item) => item.id != id);
      this.writeUsersList(newDb);
      return "Usuario eliminado";
    } else {
      return "El Usuario no se encuentra en la base de datos";
    }
  },
};

module.exports = usersModel;

