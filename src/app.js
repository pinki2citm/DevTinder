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
app.use(express.urlencoded({ extended: true })); 
app.use(cors({origin: 'http://localhost:5173',credentials:true})); 

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

app.get ("/user",async (req,res)=>{
const userEmail = req.body.email;
try{
    const user = await User.find({email: userEmail});
    res.send(user);
}
catch(error)
{
    res.status(404).send("USer not found")
}
});

app.get ("/feed",async(req,res)=>{
    try{
        const user = await User.find({});
        res.send(user);
    }
    catch(error)
    {
        res.status(404).send("USer not found")
    }
});

app.delete("/user", async (req,res)=>{
const userId= req.body.userId
try{
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully!!")
}
catch(error)
{
    res.status(404).send("User not found")
}
})

app.patch("/user",async(req,res)=>{

    //  const userId = req.body.userId;
    const userEmail = req.body.email;
      const data = req.body;    
          
      try{
          const ALLOWED_UPDATES = ["userId","photoURL", "about","gender","age","skills" ];
          const isUpdateAllowed = Object.keys(data).every((k)=>
              ALLOWED_UPDATES.includes(k)
          );
          if(!isUpdateAllowed)
             { throw new Error("update not allowed");}
  
          if( data.skills.length>10)
            {
                throw new error("skills more than 10 are not allowed")
            }

          const user = await User.findOneAndUpdate({email:userEmail
          }, data, { runValidators: true, new: true } );
          res.send("user updated successfully!!")
      }
      catch(error)
      {
          res.status(404).send("Update failed " + error.message)
      }
  })
app.use("/",(req,res)=>{
console.log("Hi DevTinder");
})

