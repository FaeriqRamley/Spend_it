require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {post_signup,post_login,post_verifyAndRefreshToken} = require("../controllers/authController");

router.post("/signup",post_signup);
router.post("/login",post_login);
router.post("/refreshToken",post_verifyAndRefreshToken);

module.exports = router;