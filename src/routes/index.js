const express = require('express');
const router = express.Router();
//Agregar las demás rutas
router.use('/', require('./main.routes'));

module.exports = router;