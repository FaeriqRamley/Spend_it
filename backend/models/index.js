const UserModel = require("./User");

const syncTables = async () => {
    try{
        await UserModel.sync();
    } catch(err){
        console.error(`Error syncing table: ${err}`);
    }
}

module.exports = {syncTables};