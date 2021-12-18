const usersModel = require("../models/usersModel.js");

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

const usersController={
    getSignIn: function (req, res) {
        res.render("./users/sign-in");
      },
    getLogin: function (req, res) {
        res.render("./users/login");
      },
    createUser: function (req, res) {
        const id = createId();
        let image = req.file.filename
        const newUser = {
          id,
          ...req.body,
          image,
        };
        console.log(newUser);
        usersModel.createUser(newUser);
        // Redirigiendo a la pagina
        // res.redirect("./users/login",);
        res.send(newUser)
      },
};

module.exports=usersController