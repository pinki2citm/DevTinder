const express = require('express');
const authRouter= express.Router();
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validateSignUpData");
const jwt = require("jsonwebtoken");
const User = require("../middlewares/models/user");

//login API
authRouter.post("/login", async (req, res) => {
  //validate email and password
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid credentials");
    //decrypt the password
    const isPasswordValid = user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    } else {
      //create a JWT token
      const token = await user.getJWT();
      //add the token to cookie and send the response back
      res.cookie("token", token);
      res.send(user);
    }
  } catch (error) {
    res.status(404).send("ERROR! " + error.message);
  }
});
authRouter.post("/signup", async (req, res) => {
  try {
    //Validate the data
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;
    //Encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);
 
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    //update the Data into Database
    await newUser.save();
    res.send("user added successfully!!!");
  } catch (error) {
   
    res.send("ERROR! " + error.message);
  }
});
//Logout API
authRouter.post("/logout", async (req, res) => {
      res.cookie("token", null,{
        expires: new Date(Date.now()),
      });
      res.send("Logout successfully!!!");
});

module.exports = {authRouter};