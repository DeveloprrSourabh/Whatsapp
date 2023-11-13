const { hashPassword, compPassword } = require("../Helpers/authHelper");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

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
