const User = require("../models/User");
const CalculatedInfo = require("../models/CalculatedInfo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateAccessToken = (user) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10m"});
    return accessToken;
}

module.exports.post_signup = async (req,res) => {

    try{
        const findRegisteredUser = await User.findAll({
            where: {
                email: req.body.email
            }
        })

        if (findRegisteredUser.length !== 0){
            return res.status(400).send({message:"Email already in use"})
        }
        console.log("email not found")
    } catch(err){
        res.status(400).send(err);
    }

    const hashedPw = await bcrypt.hash(req.body.password,10);
    
    const newUser = User.build({
        username: req.body.username,
        password: hashedPw,
        email: req.body.email
    });

    try{
        await newUser.save()
        CalculatedInfo.create({users_uuid:newUser.uuid});       
        res.status(201).send({message: "Created user"});
    } catch(err){
        res.status(400).send(err)
    }

}

module.exports.get_login = async (req,res) => {
    const findUser = await User.findOne({
        where:{
            email: req.body.email
        }
    })

    if (!findUser) {
        return res.status(404).send({message:"User not found. Email is case sensitive."})
    }
    
    const validPassword = await bcrypt.compare(req.body.password,findUser.password)

    if (!validPassword) {
        return res.status(400).send({message:"Password is incorrect"})
    }

    const user = {
        uuid: findUser.uuid,
        username: findUser.username,
        email: findUser.email
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
    res.json({accessToken,refreshToken})
}

module.exports.get_refreshToken = async (req,res) => {

}