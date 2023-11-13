const express = require("express");
require("dotenv").config();

const POST = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, (req, res) => {
  console.log(`Server Is Running On Port ${PORT}`);
});
