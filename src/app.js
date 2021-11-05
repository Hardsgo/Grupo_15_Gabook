const express = require('express');
const path = require('path');
const color = require('colors');
const routes = require('./routes/index.routes.js');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static(path.resolve(__dirname, '../public')));
// app.use(express.static(path.resolve(__dirname, '..', 'public'))); 
app.set('view engine', 'ejs');

app.use('/', routes);
app.listen(port, () => console.log(`Starting in port ${port}`.bold.magenta));