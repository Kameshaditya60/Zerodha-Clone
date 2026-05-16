const express = require("express");
const router = express.Router();
const {GetUserProfile} = require("../controllers/UserController");

router.get("/profile/",GetUserProfile );

module.exports = router;