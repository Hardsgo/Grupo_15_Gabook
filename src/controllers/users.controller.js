const usersModel = require("../models/usersModel.js");
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
    if (errors.isEmpty()) {
      const id = createId();
      let image = req.file.filename;
      const newUser = {
        id,
        ...req.body,
        image,
      };
      console.log(newUser);
      usersModel.createUser(newUser);
      
      res.redirect("/login");
      // res.send(newUser)
    } else {
      
      res.render("./users/sign-in", { 
        errors: errors.mapped() ,
        oldData: req.body
      });
    }
  },
};

module.exports = usersController;
