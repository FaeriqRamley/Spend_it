const Budget = require("../models/Budget");
const CashFlow = require("../models/CashFlow");
const Expense = require("../models/Expense");
const {Op} = require("sequelize");

module.exports.get_getCashFlows = async (req,res) => {
    try{
        const userCashFlows = await CashFlow.findAll({
            where:{
                users_uuid: req.params.useruuid
            }
        })
        res.status(200).send(userCashFlows);
    } catch(err){
        res.status(400).send(err)
    }
}

module.exports.post_createCashFlow = async (req,res) => {
    console.log('run here');
    try{
        await CashFlow.create({...req.body,users_uuid:req.params.useruuid});
        res.status(201).send("Cashflow created");
    }catch(err){
        res.status(400).send(err)
    }
}

module.exports.put_updateCashFlow = async (req,res) => {
    try{
        const updateCashFlow = await CashFlow.findByPk(req.params.cashflowuuid);
        await updateCashFlow.update(req.body);
        res.status(200).send(updateCashFlow);
    } catch(err){
        res.status(400).send(err)
    }
}

module.exports.delete_deleteCashFlow = async (req,res) => {
    try{
        const deleteCashFlow = await CashFlow.findByPk(req.params.cashflowuuid);
        await deleteCashFlow.destroy();
        res.status(200).send("Cashflow deleted");
    } catch(err){
        res.status(400).send(err)
    }
}

module.exports.get_checkApplyCashFlows = async (req,res) => {
    try{
        //Find Cash Flows
        const userCashFlows = await CashFlow.findAll({
            where:{
                users_uuid: req.params.useruuid
            }
        })

        //Apply Relevant Cash Flows
        const today = new Date();
        today.setHours(0,0,0,0);
        for (const cashflow of userCashFlows){
            let nextPaymentDate = new Date(cashflow.next_payment_date);
            console.log(`Last Payment Date:${nextPaymentDate}`);
            while (true){
                //Charging user
                if (nextPaymentDate <= today){
                    console.log(`Charging user for payment date: ${nextPaymentDate}`);
                    
                    const relevantBudget = await Budget.findOne({
                        where:{
                            [Op.and]: [
                                {title:cashflow.category},
                                {users_uuid:req.params.useruuid}
                            ]
                        }
                    })
                    
                    let budget_uuid = null
                    if (relevantBudget){
                        budget_uuid = relevantBudget.uuid
                        if (cashflow.is_income){
                            await relevantBudget.increment('current',{by:cashflow.value})
                        } else{
                            await relevantBudget.decrement('current',{by:cashflow.value})
                        }
                    }
                    
                    await Expense.create({
                        users_uuid: req.params.useruuid,
                        value: cashflow.value,
                        is_income: cashflow.is_income,
                        title: cashflow.title,
                        date: nextPaymentDate,
                        category: cashflow.category
                    })
                } else {
                    console.log(`Charge end. The next payment date is now:${nextPaymentDate}`);
                    await cashflow.update({next_payment_date:nextPaymentDate});
                    break;
                }
                
                //Updating next payment date
                if (cashflow.by_days){
                    nextPaymentDate.setDate(nextPaymentDate.getDate()+cashflow.period);
                } else {
                    const prevPaymentMonth = nextPaymentDate.getMonth()
                    nextPaymentDate.setMonth(prevPaymentMonth+1);
                    const monthDiff = prevPaymentMonth - nextPaymentDate.getMonth();
                    if(monthDiff === 2){
                        nextPaymentDate.setDate(nextPaymentDate.getDate()-1);
                    }
                }
            }
        }

        res.status(200).send({message:"Cash flow implemented",userCashFlows});
    } catch(err){
        res.status(400).send(err)
    }
}