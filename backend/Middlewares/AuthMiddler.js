const User = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ 
      success: false,
      status: false ,
      message: "Access denied. No token provided."})
  }
  try {
  const verified =  jwt.verify(token, process.env.TOKEN_KEY);
  req.user = verified;
  next();
  } catch (err) {
    return res.status(400).json({ 
      success: false,
      message: "Invalid token."})
  };
    };