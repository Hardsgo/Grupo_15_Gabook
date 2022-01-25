const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    year: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    languages_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'languages',
        key: 'id'
      }
    },
    genres_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'genres',
        key: 'id'
      }
    },
    editorial: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_Products_languages1_idx",
        using: "BTREE",
        fields: [
          { name: "languages_id" },
        ]
      },
      {
        name: "fk_products_genres1_idx",
        using: "BTREE",
        fields: [
          { name: "genres_id" },
        ]
      },
    ]
  });
};
