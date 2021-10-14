const {Sequelize, DataTypes} = require("sequelize");
const {db} = require("../postgresDB");

const User = db.define('User',{
    uuid:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        type:DataTypes.STRING(32),
        defaultValue: "Anonymous"
    },
    password: {
        type:DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type:DataTypes.STRING(256),
        allowNull: false
    }
},{
    tableName: "Users"
});

module.exports = User;