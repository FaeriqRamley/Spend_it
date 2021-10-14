const {Sequelize, DataTypes} = require("sequelize");
const {db} = require("../postgresDB");

const SavingGoal = db.define("Saving_Goal",{
    uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    users_uuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    target: {
        type: DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    current: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue:0
    },
    title: {
        type: DataTypes.STRING(64),
        allowNull: false
    }
},{
    tableName:"Saving_Goals"
})

module.exports = SavingGoal;