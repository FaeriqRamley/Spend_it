const User = require("../models/User");
const CalculatedInfo = require("../models/CalculatedInfo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateAccessToken = (user) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
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

module.exports.post_login = async (req,res) => {
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
    
    // res.cookie(`refreshToken`,refreshToken,{
    //     maxAge: 1000 * 60 * 60 * 24 * 7,
    //     secure: true,
    //     httpOnly: false
    // });

    // Remove refresh token once out of testing
    res.status(200).send({accessToken,refreshToken,user})
}

// Refresh not tested with cookies
module.exports.post_verifyAndRefreshToken = async (req,res) => {

    const refreshToken = req.body.refreshToken;
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,user) => {
        if(err){
            return res.status(400).send({message:"invalid refresh"})
        } else{
            
            const currUser = {
                uuid: user.uuid,
                username: user.username,
                email: user.email
            }

            const accessToken = generateAccessToken(currUser);
            return res.status(200).send({currUser,accessToken})
        }
    })
}