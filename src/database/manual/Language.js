module.exports = (sequelize, dataTypes) => {
    let alias = 'Languages';
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
        tableName: 'languages',
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        deletedAt: false
    };
    const Language = sequelize.define(alias, cols, config); 

    Language.associate = function (models) {
        Language.hasMany(models.Products, { // models.Movie -> Movies es el valor de alias en movie.js
            as: "product",
            foreignKey: 'languages_id'
        })
    };

    return Language;
};