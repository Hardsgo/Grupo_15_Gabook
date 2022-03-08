const express = require("express");
const router = express.Router();
const {apiUsers, apiBooks} = require("../controllers/index");




router.get("/api/users", apiUsers.getUsersApi);
router.get("/api/user/:id", apiUsers.getUserApi);
router.get("/api/users/pags", apiUsers.paginationUsersApi);

router.get("/api/products",apiBooks.getProductsApi);
router.get("/api/product/:id",apiBooks.getProductApi);
router.get("/api/products/pags", apiBooks.paginationBooksApi);





module.exports = router;