require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {post_signup,get_login,get_refreshToken} = require("../controllers")

router.get("/signup",post_signup)
router.get("/login",get_login)
router.get("/refreshToken",get_refreshToken)

module.exports = router;