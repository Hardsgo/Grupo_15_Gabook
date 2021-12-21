const express = require("express");
const session = require('express-session');
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const userLoggedMiddleware=require('./middlewares/userLoggedMiddleware.js')

app.use(session({
  secret:'it is a secrect',
  resave: false,
  saveUninitialized: false,
}))

app.use (userLoggedMiddleware);

//Seleccción el motor de plantillas EJS y setear la carpeta de vistas (views)
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

//Method override para put y delete
app.use(methodOverride("_method"));
app.use(express.static(path.resolve(__dirname, "../public")));

// - Urlencoded, captura de informacion via post de formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Router
app.use("/", require("./routes"));

// Error 404
app.use((req, res, next) => {
  res.status(404).render("404-page");
  next();
});




module.exports = app;
