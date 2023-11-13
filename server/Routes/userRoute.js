const express = require("express");
const {
  registerController,
  loginController,
} = require("../Controllers/userController");
const router = express.Router();

// REGISTER USER || METHOD POST
router.post("/register", registerController);

// LOGIN USER || METHOD POST
router.post("/login", loginController);

module.exports = router;
