module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: false
        },
        // // created_at: dataTypes.TIMESTAMP,
        // // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        isbn: {
            type: dataTypes.STRING,
            allowNull: false
        },
        year: {
            type: dataTypes.STRING,
            allowNull: false
        },
        author: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        languages_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        genres_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        editorial: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: "products",
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        deletedAt: false
    };
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.Languages, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "language", // El nombre del modelo pero en plural
            foreignKey: "languages_id"
        }),
        Product.belongsTo(models.Genres, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "genre", // El nombre del modelo pero en plural
            foreignKey: "genres_id"
        })
    };

    return Product;
};