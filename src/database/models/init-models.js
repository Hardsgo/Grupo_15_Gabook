const DataTypes = require("sequelize").DataTypes;
const _genres = require("./genres");
const _languages = require("./languages");
const _orders = require("./orders");
const _orders_has_products = require("./orders_has_products");
const _products = require("./products");
const _stock = require("./stock");
const _users = require("./users");

function initModels(sequelize) {
  const genres = _genres(sequelize, DataTypes);
  const languages = _languages(sequelize, DataTypes);
  const orders = _orders(sequelize, DataTypes);
  const orders_has_products = _orders_has_products(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const stock = _stock(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  orders.belongsToMany(products, { as: 'products_id_products', through: orders_has_products, foreignKey: "orders_id", otherKey: "products_id" });
  products.belongsToMany(orders, { as: 'orders_id_orders', through: orders_has_products, foreignKey: "products_id", otherKey: "orders_id" });
  products.belongsTo(genres, { as: "genre", foreignKey: "genres_id"});
  genres.hasMany(products, { as: "products", foreignKey: "genres_id"});
  products.belongsTo(languages, { as: "language", foreignKey: "languages_id"});
  languages.hasMany(products, { as: "products", foreignKey: "languages_id"});
  orders_has_products.belongsTo(orders, { as: "order", foreignKey: "orders_id"});
  orders.hasMany(orders_has_products, { as: "orders_has_products", foreignKey: "orders_id"});
  orders_has_products.belongsTo(products, { as: "product", foreignKey: "products_id"});
  products.hasMany(orders_has_products, { as: "orders_has_products", foreignKey: "products_id"});
  stock.belongsTo(products, { as: "product", foreignKey: "products_id"});
  products.hasMany(stock, { as: "stocks", foreignKey: "products_id"});
  orders.belongsTo(users, { as: "User", foreignKey: "Users_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "Users_id"});

  return {
    genres,
    languages,
    orders,
    orders_has_products,
    products,
    stock,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
