const express = require('express');
const requestRouter= express.Router();
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequest = require('../middlewares/models/connectionRequest');


requestRouter.post("/request/send/:status/:userId",userAuth, async (req, res) => {

  try{

  const fromUserId = req.user._id.toString();
  const touserId = req.params.userId;
  const status = req.params.status;

  const newRequest = new ConnectionRequest({
    fromUserId, 
    touserId,
    status
  });

const data =  await newRequest.save();
  res.json({
    message: "Connection Request Sent successfully!!",
    data,
  });
}
catch(error)
{
  res.status(400).send("ERROR "+ error.message);
}
});

module.exports ={requestRouter};