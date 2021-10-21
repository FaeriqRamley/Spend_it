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
    console.log('==== Begin User Update Table ====');
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
        
        let sumExpense = 0;
        let sumIncome = 0;
        for (const sum of incomeExpenseSums){
            if(sum.is_income === false){
                sumExpense = sum.sum
            } else if (sum.is_income === true) {
                sumIncome = sum.sum
            }
        }

        const sumBudgetCurrent = budgetSums[0].currentsum
        const sumBudgetTotal = budgetSums[0].totalsum
        const sumSavingsCurrent = goalSum[0].sum

        const actual_income = sumIncome - sumExpense + 0
        const disposable_income = sumIncome - sumExpense - sumBudgetTotal - sumSavingsCurrent + 0
        const current_budget = sumBudgetCurrent + 0
        const net_worth = sumIncome - sumExpense - sumBudgetTotal + 0
        console.log(actual_income,disposable_income,current_budget,net_worth);
        const userCalcInfo = await CalculatedInfo.findOne({
            where: {
                users_uuid: req.params.useruuid
            }
        });

        const newCalcInfo = await userCalcInfo.update({actual_income,disposable_income,current_budget,net_worth})
        res.status(200).send(newCalcInfo)
    }catch(err){
        res.status(400).send(err)
    }   
}