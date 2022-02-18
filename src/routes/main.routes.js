const express = require("express");
const router = express.Router();
const uploadFile = require("../middlewares/multer");
const { main } = require('../controllers/index');
const authMiddleware = require('../middlewares/authMiddleware.js')
const adminMiddleware = require('../middlewares/adminMiddleware.js')
const { validateBook } = require('../middlewares/validationMw');


router.get("/", main.getIndex);
router.get("/search", main.search);
// router.get("/login", main.getLogin);
router.get("/productDetail/:id", main.getProductDetail);
// router.get("/signIn", main.getSignIn);
router.get("/cart", authMiddleware, main.getCart);
//Create
router.get("/create-book", authMiddleware,adminMiddleware,main.getCreateBook);
router.post('/create-book',adminMiddleware,uploadFile.single('image'), validateBook, main.createBook);
//Update
// router.get("/edit-book/:id", authMiddleware,adminMiddleware,main.getUpdateBook);
router.get("/edit-book/:id",main.getUpdateBook);//para pruebas!!!!
// router.put("/edit-book/:id", uploadFile.single('image'), adminMiddleware,validateBook,main.updateBook);
router.put("/edit-book/:id", uploadFile.single('image'),main.updateBook);//para pruebas!!!
router.delete("/:id",adminMiddleware, main.deleteBook);

//Listado de Productos

// router.get("/products",authMiddleware,adminMiddleware, main.getProducts);
router.get("/products", main.getProducts);//pruebas

module.exports = router;
