const mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/facebook")
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log("error occured", err);
    });
}

module.exports = { dbConnect };
