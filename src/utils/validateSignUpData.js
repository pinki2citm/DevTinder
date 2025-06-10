const validator = require('validator');
const validateSignUpData = (req) =>
{
   const{firstName, lastName,email, password} = req.body;
   if(!firstName || !lastName) throw new Error("Name is not valid");
   else if (!validator.isEmail(email)) throw new Error("Email is not valid");
   else if (!validator.isStrongPassword(password)) throw new Error("Please enter strong password");
   
}
const validateProfileEditData = (req) =>{
   const data= req.body;
   const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "email",
      "photoURL",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
   return isUpdateAllowed;
}

module.exports ={
   validateSignUpData,validateProfileEditData
};