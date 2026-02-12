import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB connected");
  } catch (error) {
    console.error("MONGODB Connection Error: DB Config File", error);
    process.exit(1);
  }
};

export default connectDB;
