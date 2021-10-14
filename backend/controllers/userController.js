const User = require("../models/User");

module.exports.get_allUsers = async (req,res) => {
    console.log("executing get all users")
    const allUsers = await User.findAll()
    console.log(allUsers);
    res.status(200).send(allUsers)
}

module.exports.get_currentUser = async (req,res) => {
    console.log("get currentuser called")
    const currUser = await User.findOne({
        where: {
            uuid: req.body.uuid
        }
    })
    console.log(currUser)
    res.status(200).send(currUser)
}

module.exports.post_createUser = async (req,res) => {
    try{
        const newUser = await User.create(req.body);
        res.status(201).send({message: "Created user"})
    } catch(err){
        res.status(400).send(err)
    }
}