const express = require("express");
const router = express.Router();
const {api} = require("../controllers/index");




router.get("/api/users", api.getUsersApi);
router.get("/api/user/:id", api.getUserApi);



module.exports = router;