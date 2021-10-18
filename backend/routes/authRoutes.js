require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {post_signup,post_login,get_refreshToken} = require("../controllers/authController");

router.post("/signup",post_signup)
router.post("/login",post_login)
router.get("/refreshToken",get_refreshToken)

module.exports = router;