const express = require("express");
const router = express.Router();
const {users} = require("../controllers/index");
const uploadFile = require('../middlewares/multer');
const validateResgisterUser = require('../middlewares/validationMw');
const guestMiddleware = require('../middlewares/guestMiddleware.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.get("/login", guestMiddleware, users.getLogin);
router.post("/login", users.login);
router.get("/logout", users.logout);
router.get("/signIn",guestMiddleware, users.getSignIn);
router.post("/signIn",  uploadFile.single('loginImage'), validateResgisterUser, users.createUser);
router.get("/admin/users", authMiddleware, users.getUsers);
router.get("/admin/users/search", authMiddleware, users.getUser);
router.get("/admin/users/:id", authMiddleware ,users.getUserDetail);
router.put("/admin/users/:id",authMiddleware, uploadFile.single('image'), users.editUser);

module.exports = router;