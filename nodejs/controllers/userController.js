const bcrypt = require("bcrypt");

const usersModel= require("../model/userModel.js")

async function encryption(ip) {
  const salt = await bcrypt.genSalt(10);
  const hashedData = await bcrypt.hash(ip, salt);
  return hashedData;
}

async function comparePswds(x, y) {
  let result = await bcrypt.compare(x, y);
  return result;
}

exports.getUsers = async (req, res) => {
  try {
    const userData = await usersModel.find();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).send(err, "internal server error");
  }
};

exports.signUp = async (req, res) => {
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
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });
    console.log(user);
    if (!user) {
      res.send("user not found");
    } else {
      let existingPassword = user.password;
      console.log(email, password);
      let passwordCheck = await comparePswds(password, existingPassword);
      if (passwordCheck) {
        res.status(200).send("login successfull");
      } else {
        res.status(400).send("invalid password");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser= async (req, res) => {
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
  }


  exports.deleteUser= async (req, res) => {
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
  }