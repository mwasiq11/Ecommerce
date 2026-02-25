import mongoose from "mongoose";
import ENV from "./env.js";

// Cache connection for serverless (Vercel) warm starts
let cached = global._mongooseConnection;
if (!cached) {
	cached = global._mongooseConnection = { conn: null, promise: null };
}

const connectDB = async () => {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose.connect(ENV.MONGO_URI).then((m) => {
			console.log(`MongoDB connected: ${m.connection.host}`);
			return m;
		});
	}

	try {
		cached.conn = await cached.promise;
		return cached.conn;
	} catch (error) {
		cached.promise = null;
		console.error("MongoDB connection failed:", error.message);
		throw error;
	}
};

export default connectDB;