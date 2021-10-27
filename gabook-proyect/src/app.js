const express = require('express');
const path = require('path');
const color = require('colors');
const routes = require('./routes/index.js');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));
app.use('/', routes);
app.listen(port, () => console.log(`Starting in port ${port}`.bold.magenta));