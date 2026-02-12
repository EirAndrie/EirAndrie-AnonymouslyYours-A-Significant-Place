import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected: DB config file");
  } catch (error) {
    console.error("MongoDB connection error: DB.js File", error);
    process.exit(1);
  }
};

export default connectDB;
