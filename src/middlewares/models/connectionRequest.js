const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId: {
       type: mongoose.Schema.Types.ObjectId,
       required: true
    },
    touserId:{
        type: mongoose.Schema.Types.ObjectId,
       required: true
    },
    status:{
       type: String,
       required: true,
       enum: ['interested','ignored', 'accepted', 'rejected']
    }
},{
    timestamps:true
});

ConnectionRequestSchema.pre("save",function(){
// Check if the toUserId and fromUserId are Same
    if(ConnectionRequestSchema.touserId.equals(ConnectionRequestSchema.fromUserId))
    {
        throw new Error("You cannot send connection request to Yourself!!");
    }
    next();
});


//Compound Index
ConnectionRequestSchema.index({touserId: 1, fromUserId: 1});

const ConnectionRequest = mongoose.model("ConnectionRequest", ConnectionRequestSchema);
module.exports = ConnectionRequest;