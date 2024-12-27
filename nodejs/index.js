const http = require("http");
const express = require("express");
const exp = require("constants");
const app = express();
app.use(express.json());
app.get('/hello',(req,res)=>{
    let data=[{ name: "harish", city: "hyd" }]
    res.send(data)
});
app.post("/data",(req,res)=>{
    const data=req.query;
    console.log(JSON.stringify(data));
    res.send(data)
})
app.put("/u*e",(req,res)=>{
    console.log(req.body);
    res.send(req.body)
})
app.listen(3100, () => {
  console.log("server is running");
});


