const express = require('express');
const profileRouter= express.Router();
const User = require("../middlewares/models/user");
const { userAuth } = require("../middlewares/userAuth");
const { validateProfileEditData } = require('../utils/validateSignUpData');


profileRouter.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });
    res.send(user);
  } catch (error) {
    res.status(404).send("USer not found");
  }
});
profileRouter.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.status(404).send("USer not found");
  }
});
profileRouter.get("/profile/view",userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User is not found");
  } 
  res.send(user);
}catch (error) {
    res.send("ERROR! " + error.message);
  }
});
profileRouter.patch("/profile/edit",userAuth, async (req,res) =>{
 
  try {
   if(!validateProfileEditData(req))
   {
    throw new Error("Invalid Edit Request");
   }
  const loggedInUser = req.user;
  Object.keys(req.body).forEach((key)=>{loggedInUser[key]=req.body[key]});
  await loggedInUser.save();
  res.send(`${loggedInUser.firstName}, Your Profile is Updated Successfully!!`)

  } catch (error) {
    res.status(404).send("Update failed " + error.message);
  }
});

profileRouter.patch("profile/password", userAuth, async (req, res)=>{
// user may or may not logged in
//user must have signed in
const data= req.body;


});
module.exports = {profileRouter};