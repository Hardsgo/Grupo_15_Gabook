const express = require("express");
const router = express.Router();
const multer = require("multer");
const { main } = require("../controllers/index");
const path = require('path');
// const {body} = require ('express-validator')
const authMiddleware = require('../middlewares/authMiddleware.js')

// multer


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
  },
});

const uploadFile = multer({ storage });


router.get("/", main.getIndex);
router.get("/search", main.search);
// router.get("/login", main.getLogin);
router.get("/productDetail/:id", main.getProductDetail);
// router.get("/signIn", main.getSignIn);
router.get("/cart", authMiddleware, main.getCart);
//Create
router.get("/create-book", authMiddleware, main.getCreateBook);
// router.post("/create-book", main.createBook);
router.post('/create-book', authMiddleware, uploadFile.single('image'), main.createBook);
//Update
router.get("/edit-book/:id",authMiddleware, main.getUpdateBook);
router.put("/edit-book/:id", authMiddleware,uploadFile.single('image'),main.updateBook);
router.delete("/:id", authMiddleware,main.deleteBook);


//Listado de Productos
router.get("/products", authMiddleware, main.getProducts);

module.exports = router;
