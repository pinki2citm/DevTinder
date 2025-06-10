const express = require('express');
const requestRouter= express.Router();
const { userAuth } = require("../middlewares/userAuth");


requestRouter.post("/sendConnectionRequest",userAuth, async (req, res) => {
  console.log("connection request sending");
  res.send("requesting for connecttion");
});

module.exports ={requestRouter};