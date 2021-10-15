const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const SavingGoal = require("../models/SavingGoal");
const {sequelize, QueryTypes} = require("sequelize");
const {db} = require("../postgresDB");
const CalculatedInfo = require("../models/CalculatedInfo");

module.exports.get_getUserTable = async(req,res) => {
    try{
        const userCalcInfo = await CalculatedInfo.findOne({
            where: {
                users_uuid: req.params.useruuid
            }
        });
        res.status(200).send(userCalcInfo)
    } catch(err){
        res.status(400).send(err)
    }
}

module.exports.put_updateUserTable = async(req,res) => {
    try{
        const incomeExpenseSums = await Expense.sequelize.query(
            `SELECT SUM(value),is_income FROM "Expenses" WHERE users_uuid=? GROUP BY is_income`,
            {
                replacements: [req.params.useruuid],
                type: QueryTypes.SELECT
            }
        )
        
        const budgetSums = await Budget.sequelize.query(
            `SELECT SUM(current) AS currentsum,sum(total) AS totalsum FROM "Budgets" WHERE users_uuid = ?`,
            {
                replacements: [req.params.useruuid],
                type: QueryTypes.SELECT
            }
        )

        const goalSum = await SavingGoal.sequelize.query(
            `SELECT SUM(current) FROM "Saving_Goals" WHERE users_uuid = ?`,
            {
                replacements: [req.params.useruuid],
                type: QueryTypes.SELECT
            }
        )

        const sumExpense = incomeExpenseSums[0].sum
        const sumIncome = incomeExpenseSums[1].sum
        const sumBudgetCurrent = budgetSums[0].currentsum
        const sumBudgetTotal = budgetSums[0].totalsum
        const sumSavingsCurrent = goalSum[0].sum

        const actual_income = sumIncome - sumExpense
        const disposable_income = sumIncome - sumExpense - sumBudgetTotal - sumSavingsCurrent
        const current_budget = sumBudgetCurrent
        const net_worth = sumIncome - sumExpense - sumBudgetTotal

        const userCalcInfo = await CalculatedInfo.findOne({
            where: {
                users_uuid: req.params.useruuid
            }
        });

        await userCalcInfo.update({actual_income,disposable_income,current_budget,net_worth})
        res.status(200).send({message:"Finished"})
    }catch(err){
        res.status(400).send(err)
    }   
}