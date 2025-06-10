const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors",{
  origin:"http://localhost:5173/login",
  credentials: true
});
const app = express();
const cookieParser = require("cookie-parser");
const {authRouter} = require("./routers/auth");
const { requestRouter } = require("./routers/request");
const { profileRouter } = require("./routers/profile");
//Database connnection
connectDB()
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database not connceted");
  });

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173",
 httpOnly: true,  
  secure: true, credentials: true }));


app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("user deleted successfully!!");
//   } catch (error) {
//     res.status(404).send("User not found");
//   }
// });

// app.patch("/user", async (req, res) => {
//   //  const userId = req.body.userId;
//   const userEmail = req.body.email;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = [
//       "userId",
//       "photoURL",
//       "about",
//       "gender",
//       "age",
//       "skills",
//     ];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("update not allowed");
//     }

//     if (data.skills.length > 10) {
//       throw new error("skills more than 10 are not allowed");
//     }

//     const user = await User.findOneAndUpdate({ email: userEmail }, data, {
//       runValidators: true,
//       new: true,
//     });
//     res.send("user updated successfully!!");
//   } catch (error) {
//     res.status(404).send("Update failed " + error.message);
//   }
// });
// app.use("/", (req, res) => {
//   console.log("Hi DevTinder");

// });
