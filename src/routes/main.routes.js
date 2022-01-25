const express = require("express");
const router = express.Router();
const uploadFile = require("../middlewares/multer");
const { main } = require('../controllers/index');
const authMiddleware = require('../middlewares/authMiddleware.js')
const { validateBook } = require('../middlewares/validationMw');


router.get("/", main.getIndex);
router.get("/search", main.search);
// router.get("/login", main.getLogin);
router.get("/productDetail/:id", main.getProductDetail);
// router.get("/signIn", main.getSignIn);
router.get("/cart", main.getCart);
//Create
router.get("/create-book", authMiddleware,main.getCreateBook);
router.post('/create-book',uploadFile.single('image'), validateBook, main.createBook);
//Update
router.get("/edit-book/:id", authMiddleware,main.getUpdateBook);
router.put("/edit-book/:id", uploadFile.single('image'), validateBook,main.updateBook);
router.delete("/:id", main.deleteBook);

//Listado de Productos
router.get("/products",main.getProducts);

module.exports = router;
