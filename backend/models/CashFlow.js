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
        allowNull: false,
        require:true
    },
    value: {
        type: DataTypes.DECIMAL(10,2),
        allowNull:false,
        require:true
    },
    next_payment_date: {
        type:DataTypes.DATE,
        require:true
    },
    by_days: {
        type: DataTypes.BOOLEAN
    },
    period: {
        type: DataTypes.INTEGER,
        allowNull:true
    },
    title: {
        type: DataTypes.STRING(32)
    },
    is_income: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        require:true
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