const express = require("express");
const {syncTables} = require('./models');
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const cashFlowRoutes = require("./routes/cashFlowRoutes");

const PORT = process.env.PORT || 5000
const app = express();
app.use(express.json())

app.use("/user",userRoutes);
app.use("/expense",expenseRoutes);
app.use("/budget",budgetRoutes);
app.use("/cashFlow",cashFlowRoutes);

syncTables().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`=====================listening to Port ${PORT}===============================================================`)
    });
});
