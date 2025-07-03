const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const ConnectionRequest = require('../middlewares/models/connectionRequest');
const User = require('../middlewares/models/user');
const UserRouter = express.Router();

const SAFE_DATA ="firstName lastName about gender";
//Find all the  pending connection request for the loggedinUSer
UserRouter.get("/user/requests", userAuth, async (req,res)=>{

    try{
        const loggedinUSer = req.user;
        const connectionRequests = await ConnectionRequest.find({
            touserId: loggedinUSer._id,
           status:"interested"
        }).populate("fromUserId",SAFE_DATA);
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
            ]}).populate("fromUserId",SAFE_DATA)
            .populate("touserId",SAFE_DATA);

 const data = connections.map((row)=>{
    if(row.touserId._id.toString()=== loggedinUSer._id.toString())
    {
        return row.fromUserId;
    }
    return row.touserId;
 }) 
    res.json(data);
    } catch(error)
    {
        res.statusCode(400).send("ERROR!! "+ error.message);
    }
});

UserRouter.get("/feed", userAuth, async (req,res)=>{

//It should display all the user except
//0: itself
//1: connection request send + recieved
//2: connected with whom

try{

const loggedinUSer = req.user;

const connectionRequestData = await ConnectionRequest.find({
   $or:[
    {fromUserId:loggedinUSer._id},
    {touserId:loggedinUSer._id}
   ]
}).select("fromUserId touserId");


const hiddenUserFromFeed = new Set();

connectionRequestData.forEach(req=>{
    hiddenUserFromFeed.add(req.fromUserId.toString());
    hiddenUserFromFeed.add(req.touserId.toString());
})

const users = await User.find({
    $and:[
        {_id:{ $nin: Array.from(hiddenUserFromFeed)}},
        {_id: { $ne: loggedinUSer._id}}
    ]
})
    res.send(users);
} catch(error)
{
    res.status(400).send(error.message);
}

});

module.exports = {UserRouter};