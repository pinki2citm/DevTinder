const adminUSer = (req, res,next) => {
    const token = "xyz";
    const authentication = "xyz"===token;
console.log("admin data authorized");
    if (!authentication) {
        res.status(401).send("unauthorized data");
    
    } else {
        next();
    }
  };

  module.exports ={adminUSer};