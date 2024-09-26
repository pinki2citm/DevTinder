const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require('./middlewares/models/user')
app.post("/signup", async (req,res)=>{
const USerObj  = new User({
  firstName:"Pinki",
lastName: "Kumari",
email: "pinki@getMaxListeners.com",
password: "1234567",
});

await USerObj.save();
res.send("user added successfully");
})

connectDB()
  .then(() => {
    console.log("successfully connected to databse");
    app.listen(3000, (req, res) => {
      console.log("server created successfully");
    });
  })
  .catch((err) => {
    console.error("databse is not connected ");
  });

