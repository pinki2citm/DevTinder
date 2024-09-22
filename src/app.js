const express= require('express');

const app= express();

app.use("/pk",(req,res)=>{
    res.send("Hello DevTinder!!!");
});
app.use("/hello",(req,res)=>{
    res.send("Hello DevTinder this is hello command!!!");
});

app.listen(3000,()=>{
    console.log("server created successfullly.!!");
});

