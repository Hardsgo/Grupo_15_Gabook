require('dotenv').config()
const app = require('./app');
const color = require('colors');

const port = process.env.PORT

app.listen(port, () => console.log(`Starting in port ${port}`.bold.magenta));
