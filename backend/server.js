const express = require("express");
const cookieParser = require("cookie-parser");

const {authenticateToken} = require("./middleware/authMiddleware")

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const cashFlowRoutes = require("./routes/cashFlowRoutes");
const savingGoalRoutes = require("./routes/savingGoalRoutes");
const calculatedInfoRoutes = require("./routes/calculatedInfoRoutes");
const {syncTables} = require('./models');

const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/setcookie', (req, res) => {
    res.cookie(`CookieTokenName`,`encrypted cookie string Value`,{
        maxAge: 5000 * 10,
        // expires works the same as the maxAge
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send('Cookie have been saved successfully');
});

app.get('/getcookie',(req,res)=>{
    console.log(req.cookies);
    if(req.cookies["CookieTokenName"]){
        console.log(req.cookies["CookieTokenName"]);
        console.log("yes");
    } else {
        console.log("no");
    }
    res.send(req.cookies);
})

app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/expense",authenticateToken,expenseRoutes);
app.use("/budget",authenticateToken,budgetRoutes);
app.use("/cashFlow",authenticateToken,cashFlowRoutes);
app.use("/savingGoal",authenticateToken,savingGoalRoutes);
app.use("/calculatedInfo",authenticateToken,calculatedInfoRoutes);

syncTables().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`=====================listening to Port ${PORT}===============================================================`)
    });
});
