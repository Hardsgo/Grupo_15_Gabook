const express = require("express");
const router = express.Router();
const { users} = require("../controllers/index");
const uploadFile = require('../middlewares/multer');
const { validateResgisterUser } = require('../middlewares/validationMw');
const guestMiddleware = require('../middlewares/guestMiddleware.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.get("/login", guestMiddleware, users.getLogin);
router.post("/login", users.login);
router.get("/logout", users.logout);
router.get("/signIn",guestMiddleware, users.getSignIn);
router.post("/signIn",  uploadFile.single('loginImage'), validateResgisterUser, users.createUser);

module.exports = router;