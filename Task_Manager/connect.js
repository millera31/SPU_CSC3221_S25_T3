// Authored by Allie, Quinton, Lina
// 6/5/25 CSC 3221
// MongoDB connection

const mongoose = require("mongoose");

const uri = "mongodb+srv://Team3:1234@cluster0.pdc2xzl.mongodb.net/TM-T3?retryWrites=true&w=majority";

const connectDB = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
