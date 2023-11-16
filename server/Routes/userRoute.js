const express = require("express");
const formidable = require("express-formidable");
const {
  registerController,
  loginController,
  getAllUserController,
  updateProfileController,
  updatePhotoController,
  getPhotoController,
} = require("../Controllers/userController");
const { requireSign } = require("../Middlewares/authMiddleware");
const router = express.Router();

// REGISTER USER || METHOD POST
router.post("/register", registerController);

// LOGIN USER || METHOD POST
router.post("/login", loginController);

// ALL USER || METHOD GET
router.get("/all-user", requireSign, getAllUserController);

// ALL USER || METHOD POST
router.post("/update-profile/:id", requireSign, updateProfileController);

// UPDATE PROFILE PHOTO || METHOD POST
router.post(
  "/update-photo/:id",
  requireSign,
  formidable(),
  updatePhotoController
);

// GET PROFILE PHOTO || METHOD GET
router.get("/get-photo/:id", getPhotoController);

module.exports = router;
