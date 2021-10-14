const express = require("express");
const router = express.Router();
const {get_getUserBudget,post_createUserBudget,put_updateUserBudget,delete_deleteUserBudget} = require("../controllers/budgetController");

router.get("/getUserBudget/:useruuid",get_getUserBudget);
router.post("/createUserBudget/:useruuid",post_createUserBudget);
router.put("/updateBudgetDetails/:budgetuuid",put_updateUserBudget);
router.delete("/deleteBudget/:budgetuuid",delete_deleteUserBudget);

module.exports = router;