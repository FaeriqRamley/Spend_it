const express = require("express");
const {syncTables} = require('./models');
const User = require("./models/User");
const PORT = process.env.PORT || 5000
const app = express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.json({message:"ok"})
})

app.post("/",(req,res)=>{
    User.create({username:"John Doe",email:"123@gmail.com",password:"123456"});
    res.json({status:"ok",message:"User Created"});
})

syncTables().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`listening to Port ${PORT}`)
    });
});
