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
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    current: {
        type: DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    title: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    date_start: {
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
    date_end: {
        type: DataTypes.DATEONLY,
        allowNull:false
    }
},{
    tableName: "Budgets",
    timestamps: true
})

module.exports = Budget;