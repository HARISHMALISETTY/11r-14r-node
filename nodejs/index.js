require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.HTTP_PORT;
const { dbConnect } = require("./db.js");
const bcrypt = require("bcrypt");
const userRoutes = require("./routes/userRoutes.js");
const path = require("path");
const fs = require("fs");

console.log(__dirname);

let newPath = path.join(__dirname, "uploads");

if (!fs.existsSync(newPath)) {
  fs.mkdirSync(newPath);
}

// function createSampleFolder() {
//   let newPath = path.join(__dirname, "sample");
//   fs.mkdirSync(newPath);
// }

// createSampleFolder()
// console.log(newPath);

// let base=path.basename(__dirname)

// let file="normal.jpg";

// console.log(path.extname(file))

// console.log(base)

dbConnect();

app.use("/", userRoutes);

app.listen(port, () => {
  console.log("server is running");
});
