const express = require("express");
const router = express.Router();
const multer = require("multer");
const { users} = require("../controllers/index");
const path = require('path');
const {body} = require ('express-validator')


//-Validaciones

const validateResgisterUser = [
    body('name').notEmpty().withMessage('Debes colocar un nombre mayor a cuatro caracteres'),
    body('login-passwd').notEmpty().withMessage('Debes colocar una contraseña'),
    // body('email').isEmail().withMessage('Debes colocar correo valido'),
]



//-Validaciones


// --------------multer--------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, "../../public/images/users"));
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    },
  });
const uploadFile = multer({ storage });
// ---------------multer--------------------

router.get("/login", users.getLogin);
router.get("/signIn", users.getSignIn);
router.post("/signIn", uploadFile.single('login-image'), validateResgisterUser, users.createUser);




module.exports = router;