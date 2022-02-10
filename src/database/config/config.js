
require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DBUSER,
    "password": process.env.DBPASS,
    "database": process.env.DBNAME,
    "host": process.env.DBHOST,
    "dialect": process.env.DBDIALECT,
    "port": "3306",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DBUSER,
    "password": process.env.DBPASS,
    "database": process.env.DBNAME,
    "host": process.env.DBHOST,
    "dialect": process.env.DBDIALECT,
    "port": "3306",
  }
};
