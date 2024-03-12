import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    // Construct the MongoDB URI using template literals
    const uri = `${process.env.MONGODB_URI}/${DB_NAME}`;

    // Use the connect method to establish connection to MongoDB
    const connectionInstance = await mongoose.connect(uri);

    // Log a success message including the host of the connected database
    console.log(`MongoDB connected! Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    // Log an error message and exit the process if connection fails
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
