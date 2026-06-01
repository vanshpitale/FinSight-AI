import mongoose from "mongoose";
import { Env } from "./env.config";

const connectDB = async () => {
    try {
        await mongoose.connect(Env.MONGO_URI, {
            serverSelectionTimeoutMS: 8000, // Optional: Set a timeout for server selection
            socketTimeoutMS: 45000, // Optional: Set a timeout for socket operations
            connectTimeoutMS: 10000, // Optional: Set a timeout for connection operations
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB;