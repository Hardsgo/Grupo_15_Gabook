const {body} = require ('express-validator')
const path = require('path');

const validateResgisterUser = [
    body('name').isLength({ min: 3 }).withMessage('Debes escribir un nombre mayor a tres caracteres'),
    body('loginPasswd').isLength({ min: 8 }).withMessage('Debes escribir una contraseña con minimo 6 caracteres'),
    body('loginMail').isEmail().withMessage('Debes colocar correo valido - User@mail.com -'),
    body('loginImage').custom((value,{req}) =>{
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.gif'];
      if (!file){
        throw new Error('Debes subir/cargar una imagen');
      }else{
        let fileExtension = path.extname(file.originalname)
        if (!acceptedExtensions.includes(fileExtension)){
          throw new Error('Las extensiones de archivos son .jpg, .png, .gif');
          
        }
      }
      return true;
    })
];

const validateBook = [
    body('title').notEmpty().withMessage('Por favor debes escribir un título'),
    body('isbn').notEmpty().withMessage('Por favor debes digitar el isbn'),
    body('author').notEmpty().withMessage('Por favor debes escribir el nombre de un autor'),
    body('editorial').notEmpty().withMessage('Por favor debes escribir un título'),
    body('year').notEmpty().withMessage('Por favor debes escribir el año de lanzamiento'),
    body('languages_id').notEmpty().withMessage('Por favor debes seleccionar el lenguaje').bail()
      .toInt(),
    body('genres_id').notEmpty().withMessage('Por favor selecciona un género').bail()
      .toInt(),
    body('price').notEmpty().withMessage('Por favor debes escribir el precio').bail()
      .toInt(),
    body('discount').notEmpty().withMessage('Por favor debes escribir el descuento').bail()
      .toInt(),
    body('description').notEmpty().withMessage('Por favor debes escribir la descripción'),
    body('image').custom((value,{req}) =>{
      let file = req.file;
      // return console.log(file)
      let acceptedExtensions = ['.jpg', '.png', '.gif'];
      if (!file){
        throw new Error('Debes subir/cargar una imagen');
      }else{
        let fileExtension = path.extname(file.originalname)
        if (!acceptedExtensions.includes(fileExtension)){
          throw new Error('Las extensiones de archivos son .jpg, .png, .gif');
        }
      }
      return true;
    })
]

module.exports = { validateResgisterUser, validateBook};