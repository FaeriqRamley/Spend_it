const {Sequelize, DataTypes} = require("sequelize");
const {db} = require("../postgresDB");

const Budget = db.define("Budget",{
    uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    users_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        required:true
    },
    total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull:false,
        required:true
    },
    current: {
        type: DataTypes.DECIMAL(10,2),
        allowNull:false,
        required:true
    },
    title: {
        type: DataTypes.STRING(64),
        allowNull: false,
        required:true,
    },
    date_start: {
        type: DataTypes.DATEONLY,
        allowNull:false,
        required:true
    },
    date_end: {
        type: DataTypes.DATEONLY,
        allowNull:false,
        required:true
    }
},{
    tableName: "Budgets",
    timestamps: true
})

module.exports = Budget;