const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const cashFlowRoutes = require("./routes/cashFlowRoutes");
const savingGoalRoutes = require("./routes/savingGoalRoutes");
const calculatedInfoRoutes = require("./routes/calculatedInfoRoutes");
const {authenticateToken} = require("./middleware/authMiddleware")
const {syncTables} = require('./models');

const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json())
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
