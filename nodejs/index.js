require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.HTTP_PORT;
const { dbConnect } = require("./db.js");
const bcrypt = require("bcrypt");
const userRoutes=require("./routes/userRoutes.js")

dbConnect();


app.use('/', userRoutes);

app.listen(port, () => {
  console.log("server is running");
});
