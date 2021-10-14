const {Sequelize,DataTypes} = require('sequelize');
const {db} = require("../postgresDB");

const Expense = db.define("Expense",{
    uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    users_uuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    value: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
    },
    is_income:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    },
    title: {
        type: DataTypes.STRING(64),
        defaultValue: "Unnamed Entry"
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false 
    },
    category: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    budget_uuid: {
        type: DataTypes.UUIDV4,
        allowNull: false
    }
},{
    tableName: "Expenses",
    timestamps: true
})

module.exports = Expense;