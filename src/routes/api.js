const express = require("express");
const router = express.Router();
const {api} = require("../controllers/index");




router.get("/api/users", api.getUsersApi);
router.get("/api/user/:id", api.getUserApi);
router.get("/api/products",api.getProductsApi);
router.get("/api/products/:id",api.getProductApi);



module.exports = router;