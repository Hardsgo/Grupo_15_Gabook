const multer = require("multer");
const path = require('path');

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

module.exports = uploadFile;