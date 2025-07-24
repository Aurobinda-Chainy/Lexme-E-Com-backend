const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;

    console.log("MongoDB connected:", db.connection.name);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw new Error("Could not connect to MongoDB");
  }
};

module.exports = connectDB;
