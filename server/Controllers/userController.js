const { hashPassword, compPassword } = require("../Helpers/authHelper");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.send({ message: "Name Is Required" });
    }
    if (!email) {
      return res.send({ message: "Email Is Required" });
    }
    if (!password) {
      return res.send({ message: "Password Is Required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({
        success: false,
        message: "Email Already Exists",
      });
    }
    // Hash Password
    const secPass = await hashPassword(password);

    // Create User
    const newUser = await new User({
      name,
      email,
      password: secPass,
    }).save();
    return res.status(200).send({
      success: true,
      message: "Registration Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      mesage: "Error While Register User",
      error,
    });
  }
};

// Login User
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Checking Validation
    if (!email) {
      return res.status(400).send({ message: "Email Is Required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password Is Required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const comparePass = await compPassword(password, user.password);
    if (!comparePass) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Authentication Token
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    return res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        id: user._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      mesage: "Error While Login User",
      error,
    });
  }
};

// Get All User
exports.getAllUserController = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } });
    return res.status(200).send({
      success: true,
      message: "Getting All User",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Getting All User",
      error,
    });
  }
};

// Update Profile
exports.updateProfileController = async (req, res) => {
  try {
    let { names } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: names },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Profile",
      error,
    });
  }
};

// Update Photo
exports.updatePhotoController = async (req, res) => {
  try {
    const { photo } = req.files;

    let user = await User.findById(req.params.id);

    if (!user.photo) {
      if (photo) {
        user.photo.data = fs.readFileSync(photo.path);
        user.photo.contentType = photo.type;
      }
      user = await User.findByIdAndUpdate(
        req.params.id,
        { $push: { photo } },
        { new: true }
      );
      if (photo) {
        user.photo.data = fs.readFileSync(photo.path);
        user.photo.contentType = photo.type;
      }
      await user.save();
    } else {
      if (photo) {
        user.photo.data = fs.readFileSync(photo.path);
        user.photo.contentType = photo.type;
      }
      user = await User.findByIdAndUpdate(
        req.params.id,
        { photo },
        { new: true }
      );
      if (photo) {
        user.photo.data = fs.readFileSync(photo.path);
        user.photo.contentType = photo.type;
      }
      await user.save();
    }
    return res.status(200).send({
      success: true,
      message: "Photo Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Profile",
      error,
    });
  }
};

// Get Profile Photo
exports.getPhotoController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("photo");
    if (user.photo.data) {
      res.set("Content-type", user.photo.contentType);
      return res.status(200).send(user.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Getting Profie Photo",
      error,
    });
  }
};
