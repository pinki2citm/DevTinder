const express= require('express');

const app= express();

app.get("/a(bg)+c",(req,res)=>{
    res.send({name:"Akshay Saini"});
});
app.get('/files/', (req, res) => {
    const filePath = req.params[0]; // Everything after /files/
    res.send({name:"Akshay Saini"});
});


// app.get("/user",(req,res)=>{
//     res.send({name:"Akshay Saini"});
// });
// app.post("/user",(req,res)=>{
//     res.send("data successfully added");
// });
// app.delete("/user",(req,res)=>{
//     res.send("data successfully deleted");
// });
// app.use("/pk",(req,res)=>{
//     res.send("Hello pk DevTinder!!!");
// });
// app.use("/hello",(req,res)=>{
//     res.send("Hello DevTinder this is hello command!!!");
// });
// app.use("/",(req,res)=>{
//     res.send("Hello global Routing DevTinder!!!");
// });
app.listen(3000,()=>{
    console.log("server created successfullly.!!");
});

