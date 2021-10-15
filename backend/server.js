const express = require("express");
const {syncTables} = require('./models');
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const cashFlowRoutes = require("./routes/cashFlowRoutes");
const savingGoalRoutes = require("./routes/savingGoalRoutes");
const calculatedInfoRoutes = require("./routes/calculatedInfoRoutes");
const PORT = process.env.PORT || 5000
const app = express();
app.use(express.json())

app.use("/user",userRoutes);
app.use("/expense",expenseRoutes);
app.use("/budget",budgetRoutes);
app.use("/cashFlow",cashFlowRoutes);
app.use("/savingGoal",savingGoalRoutes);
app.use("/calculatedInfo",calculatedInfoRoutes);

syncTables().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`=====================listening to Port ${PORT}===============================================================`)
    });
});
