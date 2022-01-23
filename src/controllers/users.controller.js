let db = require("../database/models");
const Op = db.Sequelize.Op;
const usersModel = require("../models/usersModel.js");
const bcryptjs = require("bcryptjs");
const {
  validateResgisterUser,
  validationResult,
} = require("express-validator");

const users = usersModel.getUsers();

//crear un ID
// let createId = () => {
//   let ID = 0;
//   users.forEach((user, index) => {
//     if (user.id == ID) {
//       ++ID;
//     } else {
//       ID;
//     }
//   });
//   return ID;
// };

const usersController = {
  getSignIn: function (req, res) {
    res.render("./users/sign-in");
  },
  getLogin: function (req, res) {
    res.render("./users/login");
  },
  createUser: function (req, res) {
    let errors = validationResult(req);
    db.Users.findAll({
      where: {
        email: req.body.loginMail,
      },
    })
      .then(function (user) {
        if (user.length > 0) {
          console.log("correo existe");
          console.log(user);
          res.render("./users/sign-in", {
            errors: {
              loginMail: {
                msg: "¡Este correo ya existe!",
              },
            },
            oldData: req.body,
          });
        }
        console.log("correo existe 2");
        return errors;
      })
      .then(function (errors) {
        if (errors.isEmpty()) {
          let userImage = req.file.filename;
          db.Users.create({
            name: req.body.name,
            last_name: "Undefined",
            email: req.body.loginMail,
            password: bcryptjs.hashSync(req.body.loginPasswd, 10),
            role: 1,
            image: userImage,
          }).then(function (newUser) {
            res.render("./users/login", { newUser });
          });
        } else {
          res.render("./users/sign-in", {
            errors: errors.mapped(),
            oldData: req.body,
          });
        }
      });
  },

  login: function (req, res) {
    db.Users.findAll({
      where: {
        email: req.body.loginMail,
      },
    }).then(function (user) {
      if (user.length == 0) {
        res.render("./users/login", {
          errors: {
            loginMail: {
              msg: "¡Correo no encontrado!",
            },
          },
          oldData: req.body,
        });
      }
      if (!bcryptjs.compareSync(req.body.loginPasswd, user[0].dataValues.password)) {
        // console.log(user)
        // console.log(user[0].dataValues.password)
        res.render("./users/login", {
          errors: {
            loginPasswd: {
              msg: "¡Contraseña Incorrecta!",
            },
          },
          oldData: req.body,
        });
      } 
      else {
        delete user[0].dataValues.password;
        req.session.userLogged = user;
        res.redirect("/");
      }
    });
  },

  logout: function (req, res) {
    req.session.destroy();
    return res.redirect("/");
  },
  getUsers: function (req, res) {
    db.Users.findAll().then(function (users) {
      // res.json(users)
      res.render("./users/list-of-users", { users });
    });
  },
  getUser: function (req, res) {
    const textToSearch = req.query.keywords;
    db.Users.findAll({
      where: {
        name: { [Op.substring]: `${textToSearch}` },
      },
    }).then(function (users) {
      res.render("./users/list-of-users", { users });
    });
  },
};

module.exports = usersController;
