const {Sequelize, DataTypes} = require("sequelize");
const {db} = require("../postgresDB");

const CashFlow = db.define("Cash_Flow",{
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
        allowNull:false
    },
    last_payment_date: {
        type:DataTypes.DATE
    },
    by_days: {
        type: DataTypes.BOOLEAN
    },
    period: {
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING(16)
    },
    is_income: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(64),
        allowNull:true
    }
},{
    tableName:"Cash_Flows",
    timestamps:true
})

module.exports = CashFlow;