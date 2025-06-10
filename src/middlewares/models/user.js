const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require('mongoose');
const validator =require('validator');
const UserSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        validate(value)
        {
            if(!validator.isEmail(value)) 
                throw new Error("invalid Email");
            
        },
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
   age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value))
                throw new Error("Gender is not valid");
        }
    },
    photoURL: {
        type:String,
        default: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
    },
    skills:{
      type: [String],
    },
    about:{
        type: String,
        default: "This is the about text"
    },
   
}, 
{
    timestamps:true,
}
);


UserSchema.methods.getJWT = async function () {
    const user = this;
    const SECRET_KEY = "Dev@Tinder"; // Ensure this is a valid string

    if (!SECRET_KEY) {
        throw new Error("JWT Secret key is missing!");
    }

    const token = jwt.sign({ _id: user._id}, SECRET_KEY, {
        expiresIn: "7d",
    });

    return token;
};


UserSchema.methods.validatePassword = async function (passwodInputByUser) {
const user=this;
const isPasswordValid = await bcrypt.compare(passwodInputByUser, this.password);
return isPasswordValid;
}
    

const User = mongoose.model("User",UserSchema);
module.exports = User;