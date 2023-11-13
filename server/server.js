const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectToMongo = require("./config/db");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

// Database Connection
connectToMongo();

// All Routes

// User Routes
app.use("/api/v1/auth", userRoute);

// Chat Routes
app.use("/api/v1/chat", chatRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server Is Running On Port ${PORT}`);
});
