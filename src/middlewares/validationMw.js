const {body} = require ('express-validator')

const validateResgisterUser = [
    body('name').notEmpty().withMessage('Debes escribir un nombre mayor a cuatro caracteres'),
    body('loginPasswd').isLength({ min: 6 }).withMessage('Debes escribir una contraseña con minimo 6 caracteres'),
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

module.exports = validateResgisterUser;