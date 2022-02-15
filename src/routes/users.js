const express = require("express");
const router = express.Router();
const {users} = require("../controllers/index");
const uploadFile = require('../middlewares/multer');
const uploadFile2 = require('../middlewares/multer-2');
const { validateResgisterUser } = require('../middlewares/validationMw');
const guestMiddleware = require('../middlewares/guestMiddleware.js')
const authMiddleware = require('../middlewares/authMiddleware.js')
const adminMiddleware = require('../middlewares/adminMiddleware.js')

router.get("/login", guestMiddleware, users.getLogin);
router.post("/login", users.login);
router.get("/logout", users.logout);
router.get("/signIn",guestMiddleware, users.getSignIn);
router.post("/signIn",  uploadFile.single('loginImage'), validateResgisterUser, users.createUser);
router.get("/admin/users", authMiddleware,adminMiddleware, users.getUsers);
router.get("/admin/users/search", authMiddleware,adminMiddleware, users.getUser);
router.get("/admin/users/:id", authMiddleware, adminMiddleware,users.getUserDetail);
router.put("/admin/users/:id", authMiddleware, adminMiddleware,uploadFile2.single('image'), users.editUser);

module.exports = router;


