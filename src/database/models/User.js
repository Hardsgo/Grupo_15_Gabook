module.exports = (sequelize, dataTypes) => {

    let alias = "Users";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        },
        last_name:{
            type: dataTypes.STRING
        },
        email:{
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.STRING
        },
        role:{
            type: dataTypes.INTEGER
        },
        image:{
            type: dataTypes.STRING
        },
    };

    let config = {
        tableName: "users",
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    return User;
}