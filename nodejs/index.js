require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.HTTP_PORT;
const { dbConnect } = require("./db.js");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

dbConnect();

const usersSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const postsSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
});

const usersModel = mongoose.model("users", usersSchema);

async function encryption(ip) {
  const salt = await bcrypt.genSalt(10);
  const hashedData = await bcrypt.hash(ip, salt);
  return hashedData;
}
// retrieving users data
app.get("/users", async (req, res) => {
  try {
    const userData = await usersModel.find();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).send(err, "internal server error");
  }
});

// // inserting users data

app.post("/signUp", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const encryptedPswd = await encryption(password);
    console.log(encryptedPswd);
    const newUserDetails = new usersModel({
      username: username,
      email: email,
      password: encryptedPswd,
    });
    console.log(newUserDetails);
    const savedDetails = await newUserDetails.save();
    res.status(201).json(savedDetails);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await usersModel.findOne({email})


  } catch (error) {
    console.log(error);
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const updatingData = req.body;
    console.log(updatingData);
    console.log(req.params.id);
    const updatedData = await usersModel.findByIdAndUpdate(
      req.params.id,
      updatingData,
      { new: true }
    );

    console.log(updatedData);
    if (updatedData) {
      res.status(201).json(updatingData);
    } else {
      res.status(500).send("database error");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deltedItem = await usersModel.findByIdAndDelete(req.params.id);
    if (deltedItem) {
      res.status(200).json("record deleted successfully");
    } else {
      res.status(500).send("unable to delete");
    }
  } catch (error) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log("server is running");
});

// first let's see how can we encrypt a string using bcrypt with salt and hashing.

// let ip="harish";
// let ip1="harish";

// let hashedIp="$2b$10$POjBAoHxM8AGW3GZTtnnceTZXgXTx9jv5rDJ5W/wQLELSidha0DSm";

// async function compareIps(x,y) {

//   let result=await bcrypt.compare(x,y)
//   console.log(result);

// }

// compareIps(ip1,hashedIp)

// async function encryptInput(){
//   const salt=await bcrypt.genSalt(10);
//   const hashedIp=await bcrypt.hash(ip,salt);
//   console.log(hashedIp)

// }

// encryptInput()
