const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
require("dotenv").config();

// Check User Signin
exports.requireSign = async (req, res, next) => {
  try {
    const decode = await jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Cheking User Signin ",
      error,
    });
  }
};
