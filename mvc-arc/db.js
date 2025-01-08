const { mongoose } = require("mongoose");


function dbConnect(){
mongoose
  .connect("mongodb://127.0.0.1:27017/facebook")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.log(err));}

  module.exports={dbConnect}

  