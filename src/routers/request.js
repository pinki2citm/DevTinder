const express = require('express');
const requestRouter= express.Router();
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequest = require('../middlewares/models/connectionRequest');
const User = require('../middlewares/models/user');


requestRouter.post("/request/send/:status/:userId",userAuth, async (req, res) => {
  try{
  const fromUserId = req.user._id.toString();
  const touserId = req.params.userId;
  const status = req.params.status;

  const allowedStatus =["interested","ignored"];
  
  if(!allowedStatus.includes(status))
  {
   return res.status(400).json({message:"Invalid satus Type!"+ status});
  }
//Self connection request: corner case
   if(fromUserId === touserId)
   {
    return res.status(400).json("Cannot send connection request to itself");
   }

  //Our touser is exist or not
  const toUser = await User.findById(touserId);

  if(!toUser)
  {
       return res.status(400).json("User is not found");
  }

  //If there is an existing connection Request
  const existingConnectionRequest = await ConnectionRequest.findOne({
    $or:[
      // can't make request twice
      { fromUserId: fromUserId, touserId: touserId},
      // can't make cross connection request
     { fromUserId:touserId, touserId: fromUserId}]
  }) 
  
  if(existingConnectionRequest)
  {
   return res.status(400).json("Connection Request Already exists");
  }

  const newRequest = new ConnectionRequest({
    fromUserId, 
    touserId,
    status
  });

const data =  await newRequest.save();
  res.json({
    message: req.user.firstName +" is " +status + " in "+ toUser.firstName,
    data,
  });
}
catch(error)
{
  res.status(400).send("ERROR "+ error.message);
}
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res)=>{
try{

  const loggedInUser = req.user;
  const status = req.params.status;
  const requestId = req.params.requestId;
  // Pinki => Priya
  
  //Validate the status
   const allowedStatus =["accepted","rejected"];
    if(!allowedStatus.includes(status))
    {
    return res.status(400).json({message:"Invalid satus Type! "+ status});
    }

    const connectionRequestData = await ConnectionRequest.findOne({
      _id: requestId,
      touserId: loggedInUser._id,
      status: "interested"
    });

    if(!connectionRequestData)
    {
      return res.status(400).json({message:"Connection Request not found"});
    }

    connectionRequestData.status = status;
  const data =  await connectionRequestData.save();
  //loggedInId = touserId
  //status = interested
  //request id must be valid
res.json({message:"connection request ", status, data});
}
catch(error)
{
  res.status(400).send("ERROR "+ error.message);
}
});

module.exports ={requestRouter};