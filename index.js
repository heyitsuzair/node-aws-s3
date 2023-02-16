const express = require("express");

const app = express();
require("dotenv").config();

app.use(express.json());

const server = app.listen(process.env.PORT, () => {
  console.log("Connected");
});
