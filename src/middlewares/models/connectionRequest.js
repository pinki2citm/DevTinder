const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"    //reference to the user collection
    },
    touserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    status: {
        type: String,
        required: true,
        enum: ['interested', 'ignored', 'accepted', 'rejected']
    }
}, {
    timestamps: true
});

// Middleware to prevent sending request to self
ConnectionRequestSchema.pre("save", function (next) {
    if (this.fromUserId.equals(this.touserId)) {
        return next(new Error("You cannot send a connection request to yourself!"));
    }
    next();
});

// Compound index to prevent duplicates
ConnectionRequestSchema.index({ touserId: 1, fromUserId: 1 }, { unique: true });

const ConnectionRequest = mongoose.model("ConnectionRequest", ConnectionRequestSchema);
module.exports = ConnectionRequest;
