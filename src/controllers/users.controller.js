const usersModel = require("../models/usersModel.js");
const bcryptjs = require("bcryptjs");
const {
  validateResgisterUser,
  validationResult,
} = require("express-validator");

const users = usersModel.getUsers();

//crear un ID
let createId = () => {
  let ID = 0;
  users.forEach((user, index) => {
    if (user.id == ID) {
      ++ID;
    } else {
      ID;
    }
  });
  return ID;
};

const usersController = {
  getSignIn: function (req, res) {
    res.render("./users/sign-in");
  },
  getLogin: function (req, res) {
    res.render("./users/login");
  },
  createUser: function (req, res) {
    let errors = validationResult(req);
    let user = usersModel.getUserByMail(req.body.loginMail);
    if (user) {
      res.render("./users/sign-in", {
        errors: {
          loginMail: {
            msg: "¡Este correo ya existe!",
          },
        },
        oldData: req.body,
      });
    }
    if (errors.isEmpty()) {
      const id = createId();
      let image = req.file.filename;
      const newUser = {
        id,
        ...req.body,
        loginPasswd: bcryptjs.hashSync(req.body.loginPasswd, 10),
        image,
      };
      console.log(newUser);
      usersModel.createUser(newUser);

      res.redirect("/login");
      // res.send(newUser)
    } else {
      res.render("./users/sign-in", {
        errors: errors.mapped(),
        oldData: req.body,
      });
    }
  },

  login: function(req, res){
    let user = usersModel.getUserByName(req.body.name);
    if (!user) {
      res.render("./users/login", {
        errors: {
          name: {
            msg: "¡Usuario no encontrado!",
          },
        },
        oldData: req.body,
      });
    }

    if (!bcryptjs.compareSync(`${req.body.loginPasswd}`, user.loginPasswd)) {
      res.render("./users/login", {
        errors: {
          loginPasswd: {
            msg: "¡Contraseña Incorrecta!",
          },
        },
        oldData: req.body,
      });
    }else {
      req.session.userLogged = user;
      res.rendirect("/", {
        oldData: req.body,
      });
    }
    

  }
};

module.exports = usersController;
