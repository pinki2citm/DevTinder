const express = require("express");
const connectDB= require("./config/database")
const cors = require("cors"); 
const app = express();
const User = require('./middlewares/models/user')
//Database connnection
connectDB().then(()=>{
    console.log("Database connected Successfully");
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
  }).catch((error)=>{
   console.error("Database not connceted");
  });

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cors(
     {origin: 'http://localhost:5173',credentials:true})); 

//login API
app.post("/login", (req, res) => {
    console.log(req.body); // Debugging step

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    res.status(200).json({ message: "Login successful", email, password });
});


app.post("/signup", async (req,res)=>{

    const newUser = new User(req.body)
  await  newUser.save();
    res.send("user added successfully!!!");
});
app.use("/",(req,res)=>{
console.log("Hi DevTinder");
})

