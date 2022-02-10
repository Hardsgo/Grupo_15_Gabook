let db = require("../database/models");
const Op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");
const {
  validateResgisterUser,
  validationResult,
} = require("express-validator");

const usersModel = {
  getUsers: async () => {
    try {
      const result = await db.users.findAll();
      return result;
    } catch (error) {
      return console.log(error);
    }
  },

  valitateEmail: async (email) => {
    try {
      const result = await db.users.findAll({
        where: {
          email: email,
        },
      });
      return result;
    } catch (error) {
      return console.log(error);
    }
  },

  createUser: async (user) => {
    try {
      const result = await db.users.create(user);
      return "Creado";
    } catch (error) {
      return console.log(error);
    }
  },

  loginUserVerification: async (loginEmail) => {
    try {
      const user = await db.users.findAll({
        where: { email: loginEmail },
      });
      return user;
    } catch (error) {
      return console.log(error);
    }
  },

  searchUser: async (textToSearch) => {
    try {
      const users = await db.users.findAll({
        where: {
          name: { [Op.substring]: `${textToSearch}` },
        },
      });
      return users;
    } catch (error) {
      return console.log(error);
    }
  },

  getUserDetail: async (id) => {
    try {
      const user = await db.users.findByPk(id);
      return user;
    } catch (error) {
      return console.log(error);
    }
  },

  updateUser: async (idToEdit,  userToUpdate ) => {
    try {
        console.log (userToUpdate)
      const user = await db.users.update(userToUpdate, {
        where: { id: idToEdit },
      });
      return `Usuario Actualizado`;
    } catch (error) {
      return console.log(error);
    }
  },
};

module.exports = usersModel;
