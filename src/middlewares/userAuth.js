const User = require("./models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res,next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
          throw new Error("Token is not valid");
        }
        const decodedMessage = await jwt.verify(token, "Dev@Tinder");
        const { _id } = decodedMessage;
        const user = await User.findById(_id);
        if (!user) {
          throw new Error("User is not found");
      } 
     req.user=user;
      next();
    }catch (error) {
        res.send("ERROR! " + error.message);
      }
  };

  module.exports ={userAuth};