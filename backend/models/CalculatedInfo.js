const {Sequelize, DataTypes} = require("sequelize");
const {db} = require("../postgresDB");

const CalculatedInfo = db.define("Calculated_Info",{
    users_uuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    actual_income:{
        type: DataTypes.DECIMAL(10,2),
        defaultValue:0
    },
    net_worth:{
        type: DataTypes.DECIMAL(10,2),
        defaultValue:0
    },
    disposable_income:{
        type: DataTypes.DECIMAL(10,2),
        defaultValue:0
    },
    current_budget:{
        type: DataTypes.DECIMAL(10,2),
        defaultValue:0
    },
},{
    tableName:"Calculated_Infos"
})

module.exports = CalculatedInfo;