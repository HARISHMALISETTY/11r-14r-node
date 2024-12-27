const express = require("express");
const exp = require("constants");
const app = express();
app.use(express.json());
const { userNameValidator, passwordValidator } = require("./middlewares.js");

app.post("/signup", userNameValidator, passwordValidator, (req, res) => {
  let data = req.body;

  res.send(data);
});

app.listen(3100, () => {
  console.log("server is running");
});
