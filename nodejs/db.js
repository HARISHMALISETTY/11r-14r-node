require("dotenv").config();

const mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log("error occured", err);
    });
}

module.exports = { dbConnect };
