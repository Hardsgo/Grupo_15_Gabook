let db = require("../database/models");
const Op = db.Sequelize.Op;
const usersModel = require("../models/usersModel.js");
const bcryptjs = require("bcryptjs");
const {
  validateResgisterUser,
  validationResult,
} = require("express-validator");

const usersController = {
  getSignIn: function (req, res) {
    res.render("./users/sign-in");
  },

  getLogin: function (req, res) {
    res.render("./users/login");
  },

  createUser: async function (req, res) {
    try {
      let userImage = !req.file ? "GenericUserImage.png" : req.file.filename;
      const newUser = {
        name: req.body.name,
        last_name: "Undefined",
        email: req.body.loginMail,
        password: bcryptjs.hashSync(req.body.loginPasswd, 10),
        role: 0,
        image: userImage,
      };
      let errors = validationResult(req);
      const validUser = await usersModel.valitateEmail(newUser.email);
      if (validUser.length > 0) {
        console.log("correo existe");
        return res.render("./users/sign-in", {
          errors: {
            loginMail: {
              msg: "¡Este correo ya existe!",
            },
          },
          oldData: req.body,
        });
      }
      if (!errors.isEmpty()) {
        res.render("./users/sign-in", {
          errors: errors.mapped(),
          oldData: req.body,
        });
      } else {
        await usersModel.createUser(newUser);
        return res.render("./users/login", { newUser });
      }
    } catch (error) {
      res.render("404-page");
      console.log(error);
    }
  },

  login: async function (req, res) {
    try {
      const user = await usersModel.loginUserVerification(req.body.loginMail);
      if (user.length == 0) {
        return res.render("./users/login", {
          errors: {
            loginMail: { msg: "¡Correo no encontrado!" },
          },
          oldData: req.body,
        });
      }
      if (
        !bcryptjs.compareSync(req.body.loginPasswd, user[0].dataValues.password)
      ) {
        console.log(user);
        console.log(user[0].dataValues.password);
        res.render("./users/login", {
          errors: {
            loginPasswd: {
              msg: "¡Contraseña Incorrecta!",
            },
          },
          oldData: req.body,
        });
      } else {
        delete user[0].dataValues.password;
        req.session.userLogged = user;
        res.redirect("/");
      }
    } catch (error) {
      res.render("404-page");
      console.log(error);
    }
  },

  logout: function (req, res) {
    req.session.destroy();
    return res.redirect("/");
  },
  getUsers: async (req, res) => {
    try {
      const result = await usersModel.getUsers();
      res.render("./users/list-of-users", { users: result });
    } catch (error) {
      res.render("404-page");
      console.log(error);
    }
  },

  getUser: async function (req, res) {
    try {
      const textToSearch = req.query.keywords;
      const result = await usersModel.searchUser(textToSearch);
      res.render("./users/list-of-users", { users: result });
    } catch (error) {
      res.render("404-page");
      console.log(error);
    }
  },

  getUserDetail: async function (req, res) {
    try {
      // const { id } = req.params;
      const user = await usersModel.getUserDetail(req.params.id);
      res.render("./users/edit-user", { user });
    } catch (error) {
    res.render("404-page");
    console.log(error);
  }
},

  editUser: async function (req, res) {
    try {
      const user = await usersModel.getUserDetail(req.params.id);
      let userImage = !req.file ? user.image : req.file.filename;
      const userToUpdate = {
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: !req.body.password ? user.password : bcryptjs.hashSync(req.body.password, 10),
        // password: bcryptjs.hashSync(req.body.password, 10),
        role: req.body.role,
        image: userImage,
      };
      usersModel.updateUser(req.params.id, userToUpdate);

      res.redirect("/admin/users/" + req.params.id);
    } catch (error) {
      res.render("404-page");
      console.log(error);
    }
  },

  // seditUser: function (req, res) {
  //   const { id } = req.params;
  //   let userImage = req.file.filename;
  //   db.users.update(
  //     {
  //       name: req.body.name,
  //       last_name: req.body.last_name,
  //       email: req.body.email,
  //       password: bcryptjs.hashSync(req.body.password, 10),
  //       rol: req.body.rol,
  //       image: userImage,
  //     },
  //     {
  //       where: { id: id },
  //     }
  //   );

  //   res.redirect("/admin/users/" + id);
  // },
};

module.exports = usersController;
