const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const UserRouter = express.Router();

//Find all the  pending connection request for the loggedinUSer
UserRouter.get("/user/requests", userAuth, async (req,res)=>{

    try{
        const loggedinUSer =req.user;
        
    }
    catch(error)
    {
        res.status(400).send("ERROR!! ", error);
    }

});

UserRouter.get("/user/connections", userAuth, async (req,res)=>{

});
UserRouter.get("/user/feed", userAuth, async (req,res)=>{

});