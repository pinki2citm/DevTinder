const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const ConnectionRequest = require('../middlewares/models/connectionRequest');
const UserRouter = express.Router();

//Find all the  pending connection request for the loggedinUSer
UserRouter.get("/user/requests", userAuth, async (req,res)=>{

    try{
        const loggedinUSer = req.user;
        const connectionRequests = await ConnectionRequest.find({
            touserId: loggedinUSer._id,
           status:"interested"
        }).populate("fromUserId","firstName lastName about gender");
        res.json({
            message: "Data fetched successfully", 
            data:connectionRequests,
        });
    } catch(error)
    {
        res.statusCode(400).send("ERROR!! "+ error.message);
    }

});

//find all the connection of the logged in User
UserRouter.get("/user/connections", userAuth, async (req,res)=>{
 try{
        const loggedinUSer = req.user;
        const connections = await ConnectionRequest.find({
            $or:[
                { touserId:loggedinUSer._id, status: "accepted"},
               { fromUserId:loggedinUSer._id,status: "accepted"},
            ]}).populate("fromUserId","firstName lastName photoURL skills about gender")
            .populate("touserId","firstName lastName photoURL skills about gender");

 const data = connections.map((row)=>{
    if(row.touserId._id.toString()=== loggedinUSer._id.toString())
    {
        return row.fromUserId;
    }
    return row.touserId;
 }) 
    res.json(data);
    console.log(data);
    } catch(error)
    {
        res.statusCode(400).send("ERROR!! "+ error.message);
    }
});

UserRouter.get("/user/feed", userAuth, async (req,res)=>{

});

module.exports = {UserRouter};