const express = require("express");
const router = express.Router();
const multer = require('multer')

//Agregar las demás rutas
router.use("/", require("./main.routes"));
router.use("/", require("./users.js"));
router.use("/", require("./api.js"));

module.exports = router;
