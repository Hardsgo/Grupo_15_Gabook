const express = require("express");
const router = express.Router();
const { users} = require("../controllers/index");
const uploadFile = require('../middlewares/multer');
const validateResgisterUser = require('../middlewares/validationMw');

router.get("/login", users.getLogin);
router.post("/login", users.login);
router.get("/signIn", users.getSignIn);
router.post("/signIn", uploadFile.single('loginImage'), validateResgisterUser, users.createUser);

module.exports = router;