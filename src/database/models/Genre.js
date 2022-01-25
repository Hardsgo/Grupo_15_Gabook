module.exports = (sequelize, dataTypes) => {
    let alias = 'Genres';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
    };
    let config = {
        tableName: 'genres',
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        deletedAt: false
    };
    const Genre = sequelize.define(alias, cols, config); 

    Genre.associate = function (models) {
        Genre.hasMany(models.Products, { // models.Movie -> Movies es el valor de alias en movie.js
            as: "product",
            foreignKey: 'genres_id'
        })
    };

    return Genre;
};