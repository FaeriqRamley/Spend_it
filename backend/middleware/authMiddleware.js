require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
            if (err) {
                res.status(403).send({message:"no access. Token expired"})
            } else {
                req.user = user
                next()
            }
        })
    } else {
        res.status(401).send({message:"no token"})
    }
}