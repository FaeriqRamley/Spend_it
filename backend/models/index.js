const UserModel = require("./User");
const ExpenseModel = require("./Expense");
const CashFlowModel = require("./CashFlow");
const BudgetModel = require("./Budget");
const SavingGoalModel = require("./SavingGoal");
const CalculatedInfo = require("./CalculatedInfo");

const syncTables = async () => {

    try{
        await UserModel.sync();
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }
    
    try{
        await ExpenseModel.sync();
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }

    try{
        await CashFlowModel.sync();
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }

    try{
        await BudgetModel.sync();
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }

    try{
        await SavingGoalModel.sync();
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }

    try{
        await CalculatedInfo.sync();
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }

}

module.exports = {syncTables};