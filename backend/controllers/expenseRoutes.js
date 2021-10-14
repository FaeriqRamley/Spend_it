const Expense = require("../models/Expense");
const {sequelize,Op} = require("sequelize");

module.exports.get_viewUser = async (req,res) => {
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
        await Expense.create({...req.body, users_uuid:req.params.useruuid});
        res.status(201).send({message:"Expense Logged"});
    } catch (err) {
        res.status(400).send(err);
    }
}
