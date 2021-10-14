const express = require("express");
const router = express.Router();
const {get_getCashFlows,post_createCashFlow,put_updateCashFlow,delete_deleteCashFlow,get_checkApplyCashFlows} = require("../controllers/cashFlowController");

router.get("/getCashFlows/:useruuid",get_getCashFlows);
router.post("/createCashFlow/:useruuid",post_createCashFlow);
router.put("/updateCashFlow/:cashflowuuid",put_updateCashFlow);
router.delete("/deleteCashFlow/:cashflowuuid",delete_deleteCashFlow);
router.get("/checkApplyCashFlows/:useruuid",get_checkApplyCashFlows);

module.exports = router