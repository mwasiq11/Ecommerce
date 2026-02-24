import mongoose from "mongoose";
import ENV from "./env.js";

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(ENV.MONGO_URI);
		console.log(`MongoDB connected: ${connect.connection.host}`);
	} catch (error) {
		console.error("MongoDB connection failed:", error.message);
		process.exit(1);
	}
};

export default connectDB;