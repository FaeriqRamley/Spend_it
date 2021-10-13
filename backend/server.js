const express = require("express");
const {Sequelize} = require("sequelize");

const app = express();
app.use(express.json())

// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')
const sequelize = new Sequelize('postgres://db_user:example@localhost:5432/proj_4_test');

const testDB = async () => {
    try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
    }
}

testDB();

app.get("/",(req,res)=>{
    res.json({message:"ok"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`listening to Port ${PORT}`)
});