const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders_has_products', {
    orders_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    products_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders_has_products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orders_id" },
          { name: "products_id" },
        ]
      },
      {
        name: "fk_orders_has_products_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_id" },
        ]
      },
      {
        name: "fk_orders_has_products_orders1_idx",
        using: "BTREE",
        fields: [
          { name: "orders_id" },
        ]
      },
    ]
  });
};
