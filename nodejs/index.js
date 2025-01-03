const express = require("express");
const app = express();
app.use(express.json());
const port = 3100;
const { dbConnect } = require("./db.js");
const { default: mongoose } = require("mongoose");

dbConnect();

const usersSchema = new mongoose.Schema({
  username: String,
  city: String,
});

const postsSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
});

const usersModel = mongoose.model("users", usersSchema);
// retrieving users data
app.get("/users", async (req, res) => {
  try {
    const userData = await usersModel.find();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).send(err, "internal server error");
  }
});

// inserting users data

app.post("/users", async (req, res) => {
  try {
    const userData = req.body;
    const newUserDetails = new usersModel(userData);
    const savedDetails = await newUserDetails.save();
    res.status(201).json(savedDetails);
  } catch (err) {
    res.status(500).send(err, "internal server error");
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
