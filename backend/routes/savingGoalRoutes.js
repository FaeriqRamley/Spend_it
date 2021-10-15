const express = require("express");
const router = express.Router();
const {get_viewGoals,post_createGoal,put_updateGoalInfo,put_updateGoalValue,delete_deleteGoal} = require("../controllers/savingGoalController");


router.get("/viewGoals/:useruuid",get_viewGoals);
router.post("/createGoal/:useruuid",post_createGoal);
router.put("/updateGoalInfo/:goaluuid",put_updateGoalInfo);
router.put("/updateGoalValue/:goaluuid",put_updateGoalValue);
router.delete("/deleteGoal/:goaluuid",delete_deleteGoal);

module.exports = router;