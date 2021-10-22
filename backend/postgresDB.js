const {Sequelize,DataTypes} = require("sequelize");

const testDB = async (db) => {
    try {
            await db.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
    }
}

// const syncTables = async (db) => {
//     try{
//         await db.sync({alter:true});
//         console.log("Tables synced successfully");
//     } catch (err){
//         console.error("Unable to sync tables:",err);
//     }
// }

// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')
const db = new Sequelize('postgres://db_user:example@localhost:5432/proj_4_presentation');

testDB(db)

module.exports = {
    db
};