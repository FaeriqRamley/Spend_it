const User = require("../models/User");
const CalculatedInfo = require("../models/CalculatedInfo");

module.exports.get_allUsers = async (req,res) => {
    const allUsers = await User.findAll()
    console.log(allUsers);
    res.status(200).send(allUsers)
}

module.exports.get_currentUser = async (req,res) => {
    const currUser = await User.findOne({
        where: {
            uuid: req.body.uuid
        }
    })
    console.log(currUser)
    res.status(200).send(currUser)
}

module.exports.post_createUser = async (req,res) => {
    const newUser = User.build(req.body);
    try{
        await newUser.save()
        CalculatedInfo.create({users_uuid:newUser.uuid});       
        res.status(201).send({message: "Created user"});
    } catch(err){
        res.status(400).send(err)
    }
}