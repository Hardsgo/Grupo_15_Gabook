const multer = require("multer");
const path = require('path');

// --------------multer--------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log(req.url);
      if(req.url === "/signIn"){
        //-------------Guarda la imagen en la carpeta images/users
        cb(null, path.resolve(__dirname, "../../public/images/users"));
      } else {
        //--------Guarda la imagen en la carpeta images si es en la url crear libro
        cb(null, path.resolve(__dirname, "../../public/images"));
      }
    },
    filename: function (req, file, cb) {
      let filename = `${Date.now()}_img_${path.extname(file.originalname)}`
      cb(null, filename);
    },
  });
const uploadFile = multer({ storage });

module.exports = uploadFile;