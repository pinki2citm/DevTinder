const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect("mongodb+srv://pinkikumaristm9:ZJBRuVfoHllUQWGr@cluster0.ns6vq.mongodb.net/");
};
module.exports = connectDB;

