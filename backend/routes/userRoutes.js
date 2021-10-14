const express = require('express');
const router = express.Router();
const {post_createUser,get_currentUser,get_allUsers} = require("../controllers/userController");

router.get("/allUsers",get_allUsers)
router.get("/currentUser",get_currentUser)
router.post("/createUser",post_createUser)

module.exports = router;