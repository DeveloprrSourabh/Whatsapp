const bcrypt = require("bcryptjs");

// Hash Password
exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Hashing Password",
      error,
    });
  }
};
// Compare Password
exports.compPassword = async (password, userPasword) => {
  try {
    const comparePass = await bcrypt.compare(password, userPasword);
    return comparePass;
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Hashing Password",
      error,
    });
  }
};
