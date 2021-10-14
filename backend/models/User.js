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
        allowNull: false,
        require:true
    },
    email: {
        type:DataTypes.STRING(256),
        allowNull: false,
        require:true
    }
},{
    tableName: "Users"
});

module.exports = User;