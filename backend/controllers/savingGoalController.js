const SavingGoal = require("../models/SavingGoal");

module.exports.get_viewGoals = async (req,res) => {
    try{
        const userGoals = await SavingGoal.findAll({
            where:{
                users_uuid: req.params.useruuid
            }
        })
        res.status(200).send(userGoals);
    } catch(err){
        res.status(400).send(err)
    }
}

module.exports.post_createGoal = async (req,res) => {
    try{
        const newGoal = await SavingGoal.create({...req.body,users_uuid:req.params.useruuid})
        res.status(201).send({message:"ok",newGoal})
    } catch(err){
        res.send(400).send(err)
    }
}

module.exports.put_updateGoalInfo = async (req,res) => {
    try{
        const updateGoal = await SavingGoal.findByPk(req.params.goaluuid);
        await updateGoal.update(req.body);
        res.status(200).send({message:"Updated Info"})
    } catch(err){
        res.send(400).send(err)
    }
}

module.exports.put_updateGoalValue = async (req,res) => {
    try{
        const updateGoal = await SavingGoal.findByPk(req.params.goaluuid);
        
        if(req.body.type === "Deposit"){
            await updateGoal.increment('current',{by:req.body.value})
            //remove from disposable income
        } else if (req.body.type === "Withdraw"){
            await updateGoal.decrement('current',{by:req.body.value})
            //add to disposable income
        } else{
            res.status(400).send({message:"type not recognized"})
        }
        res.status(200).send({message:"Update Successful",updateGoal})
    } catch(err){
        res.status(400).send(err)
    }
}

module.exports.delete_deleteGoal = async (req,res) => {
    try{
        const deleteGoal = await SavingGoal.findByPk(req.params.goaluuid);
        await deleteGoal.destroy();
        res.status(200).send({message:"Delete Successful"});
    } catch(err){
        res.status(400).send(err);
    }
}