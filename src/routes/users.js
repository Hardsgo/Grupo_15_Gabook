const express = require("express");
const router = express.Router();
const multer = require("multer");
const { users} = require("../controllers/index");
const path = require('path');
// const {body} = require ('express-validator')



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
router.post("/signIn", uploadFile.single('login-image'),users.createUser);




module.exports = router;