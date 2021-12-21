const express = require("express");
const router = express.Router();
const multer = require('multer')

//Agregar las demás rutas
router.use("/", require("./main.routes"));
router.use("/", require("./users.js"));

module.exports = router;
