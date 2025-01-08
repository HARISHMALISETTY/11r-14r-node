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
const multer=require("multer");
const jwt=require("jsonwebtoken");
const jwt_secret_key = "hjdcvfknjdvnfk";


console.log(__dirname);

let newPath = path.join(__dirname, "uploads");

if (!fs.existsSync(newPath)) {
  fs.mkdirSync(newPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, newPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

dbConnect();

app.use("/", userRoutes);

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Request received");
  console.log("Uploaded File:", req.file);
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(201).send({ file: req.file });
});

app.listen(port, () => {
  console.log("server is running", port);
});
