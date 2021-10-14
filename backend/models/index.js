const UserModel = require("./User");
const ExpenseModel = require("./Expense");
const CashFlowModel = require("./CashFlow");
const BudgetModel = require("./Budget");
const SavingGoalModel = require("./SavingGoal");
const CalculatedInfo = require("./CalculatedInfo");

const syncTables = async () => {

    try{
        await UserModel.sync({alter:true});
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }
    
    try{
        await ExpenseModel.sync({alter:true});
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }

    try{
        await CashFlowModel.sync({alter:true});
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }

    try{
        await BudgetModel.sync({alter:true});
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }

    try{
        await SavingGoalModel.sync({alter:true});
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }

    try{
        await CalculatedInfo.sync({alter:true});
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }

}

module.exports = {syncTables};