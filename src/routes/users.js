const express = require("express");
const router = express.Router();
const multer = require("multer");
const { users} = require("../controllers/index");
const path = require('path');
const {body} = require ('express-validator')


//-Validaciones

const validateResgisterUser = [
    body('name').notEmpty().withMessage('Debes escribir un nombre mayor a cuatro caracteres'),
    body('loginPasswd').isLength({ min: 6 }).withMessage('Debes escribir una contraseña con minimo 6 caracteres'),
    // body('email').isEmail().withMessage('Debes colocar correo valido'),
    body('loginImage').custom((value,{req}) =>{
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.gif'];
      if (!file){
        throw new Error('Debes que subir una imagen');
      }else{
        let fileExtension = path.extname(file.originalname)
        if (!acceptedExtensions.includes(fileExtension)){
          throw new Error('Las extensiones de archivos son .jpg, .png, .gif');
        }
      }
      return true;
    })
]

// --------------multer--------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, "../../public/images/users"));
    },
    filename: function (req, file, cb) {
      let filename = `${Date.now()}_img_${path.extname(file.originalname)}`
      cb(null, filename);
    },
  });
const uploadFile = multer({ storage });
// ---------------multer--------------------

router.get("/login", users.getLogin);
router.get("/signIn", users.getSignIn);
router.post("/signIn", uploadFile.single('loginImage'), validateResgisterUser, users.createUser);





module.exports = router;