const express = require("express");
const router = express.Router();
const {get_getUserTable,put_updateUserTable} = require("../controllers/calculatedInfoController");

router.get("/usertable/:useruuid",get_getUserTable);
router.put("/update/:useruuid",put_updateUserTable);

module.exports = router;