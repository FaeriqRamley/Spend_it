const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

module.exports.get_getUserBudget = async (req,res) => {
    try{
        const userBudgets = await Budget.findAll({
            where: {
                users_uuid: req.params.useruuid
            }
        })
        res.status(200).send(userBudgets)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.post_createUserBudget = async (req,res) => {
    try{
        const newUserBudget = await Budget.create({...req.body,users_uuid:req.params.useruuid})
        res.status(201).send(newUserBudget)
    } catch(err){
        res.status(400).send(err)
    }
}

module.exports.put_updateUserBudget = async (req,res) => {
    try{
        const userBudget = await Budget.findByPk(req.params.budgetuuid);
        await userBudget.update(req.body)
        res.status(200).send(userBudget)
    } catch(err){
        res.status(400).send(err)
    }
}

module.exports.delete_deleteUserBudget = async (req,res) => {
    try{
        const userBudget = await Budget.findByPk(req.params.budgetuuid);
        await userBudget.destroy();
        console.log('==== userbudget destroyed ====')
        await Expense.update({budget_uuid:null},{where:{budget_uuid:req.params.budgetuuid}});
        res.status(200).send({message:"budget deleted"})
    } catch(err){
        console.log('====error in the backend====')
        res.status(400).send(err)
    }
}