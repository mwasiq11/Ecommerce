import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Only load .env file when running locally (not on Vercel)
if (!process.env.VERCEL) {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
}

const ENV = {
	PORT: process.env.PORT || 5000,
	MONGO_URI: process.env.MONGO_URI,
	JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key'
}

export default ENV;