const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const {Op} = require("sequelize");

module.exports.get_viewUser = async (req,res) => {
    console.log(req.user);
    try{
        const userExpenses = await Expense.findAll({
            where:{
                users_uuid: req.params.useruuid
            }
        })
        res.status(200).send(userExpenses)
    }catch(err){
        res.status(400).send(err)
    }
}

module.exports.get_search = async (req,res) => {
    try{
        const searchExpenses = await Expense.findAll({
            where:{
                [Op.and]: [
                    {
                        title: {[Op.iLike]:`%${req.body.query}%`}
                    },
                    {
                        users_uuid: req.params.useruuid
                    }
                ]
            },
            order:[['date','DESC']]
        })
        res.status(200).send(searchExpenses);
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.post_addExpense = async (req,res) => {
    try{
        const relevantBudget = await Budget.findOne({
            where:{
                [Op.and]: [
                    {title:req.body.category},
                    {users_uuid:req.params.useruuid}
                ]
            }
        })

        let budget_uuid = null
        if (relevantBudget){
            budget_uuid = relevantBudget.uuid
            if (req.body.is_income){
                await relevantBudget.increment('current',{by:req.body.value})
            } else{
                await relevantBudget.decrement('current',{by:req.body.value})
            }
        }

        await Expense.create({...req.body, users_uuid:req.params.useruuid,budget_uuid});
        res.status(201).send({message:"Expense Logged"});
    } catch (err) {
        res.status(400).send(err);
    }
}
