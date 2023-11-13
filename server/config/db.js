const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(console.log("Connection Successfully"))
    .catch((err) => console.log(err));
};

module.exports = connectToMongo;
