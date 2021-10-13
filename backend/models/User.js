const {DataTypes} = require("sequelize");
const {db} = require("../postgresDB");

const User = db.define('User',{
    username: {type:DataTypes.STRING(64)},
    password: {type:DataTypes.STRING(256)},
    email: {type:DataTypes.STRING(256)}
},{
    tableName: "Users",
    timestamps: true
});

module.exports = User;