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

const ConnectionRequest = mongoose.model("ConnectionRequest", ConnectionRequestSchema);
module.exports = ConnectionRequest;