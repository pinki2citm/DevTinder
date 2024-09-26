const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://goodfitness44:IhCatXhO3mz2kWz1@cluster0.5i53v.mongodb.net/user"
  );
};

module.exports =connectDB;
