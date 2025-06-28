#order of routing is very important
#the scanning of routing goes from top to bottom
# create the server using express.js
# Routing in express.js 
#order of Routes are most important
# testing the APIs in Postman
# login API created
# MiddleWares and Error Handling

#s2-E06
# created a MongoDB cluster on MongoDB Atlas
# connected that cluster into our MongoDB compass 
# with the help of that MONGO URI, we are connected our backend to the particular cluster
#MONGO URI: mongodb+srv://pinkikumaristm9:ZJBRuVfoHllUQWGr@cluster0.ns6vq.mongodb.net/
# now move the code of connecting DB to the app.js file for better connectivity
#it's a good practice to connect DB first, then do the other operations.

#S2-E07
#JS object VS JSON
# sending the data directly form the server using req.body.
# make the /signup API dynamic to receive data from the end user
#make the get/user and get/feed API and fetch the data
#model.find() Vs model.findOne() method
#deleted user bu delete/user API.
#update the user data patch/user API
# Homework: update the API with email(Completed)

#ep-08: Data Santitization and API Santitization
#validators: require, trim, default,
#create a custom validator of gender
#add timestamps to the schema
#update patch API/user 
#install validator and check for email vaidation using function.

#EP:09  Validate sign up data
# encrypted the password using bcrypt.hash()
#and store the encrypted passsword into the database
#create login api and add some validations (email and password check)

#EP-10
#install cookie-parser
#just send a dummy cooike to the user
#create a /profile API and check if you get the cookie back or not
#install jwt token
#In login API create a JWT tokens, send back to the user
#now read the cookie inside your profile API the find the user which is logged in

# create a UserAuth MiddleWare
# Add the UserAuth middleWare to the /profile API 
# create a new API /createConnectionRequest  APIs
# Set the Expiry of JWT token and cookies to 7 days

#created getJWT() and validatePassword inside the mongoose schema(User)

# EP -11
# created Rotes folder for managing authRouter, profileRouter,requestRouter
# Created authRouter, profileRouter,requestRouter
# Imported all of these in app.js
#created  GET profile/view and PATCH profile/edit api
#Homework PATCH profile/passsword => forgot password api

# Make validate all the data in POST, PATCH api

# EP - 12
# created ConnectionRequestModelSchema for sending connection request,
 - add proper validations(think about corner cases) 
-  $or query in mondogb
 - schema.pre("save") function

# Creating request/send/interested/:userId
# Creating request/send/ignored/:userId

The above two are converted into: 
request/send/status/:userId  (Done)

# Creating request/review/accepted/:userId
# Creating request/review/rejected/:userId 

The above two are converted into: 
request/review/status/:userId   (Pending)

# Read more about indexes in database
# Why do we need index in database?
# what is the advantages and disadvantages of creting indexes?



