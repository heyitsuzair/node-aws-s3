const express = require("express");

const app = express();
require("dotenv").config();

const index = require("./routes/index");

app.use("/", index);

const server = app.listen(process.env.PORT, () => {
  console.log("Connected To " + process.env.PORT);
});
