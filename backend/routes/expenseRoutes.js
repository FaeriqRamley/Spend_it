const express = require('express');
const router = express.Router();
const {post_addExpense,get_search,get_viewUser} = require("../controllers/expenseController");

router.get("/viewUser/:useruuid",get_viewUser);
router.get("/search/:useruuid",get_search);
router.post("/log/:useruuid",post_addExpense);

module.exports = router;