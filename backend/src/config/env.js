import dotenv from 'dotenv'

// Only load .env file when running locally (not on Vercel)
if (!process.env.VERCEL) {
	const path = await import('path');
	const { fileURLToPath } = await import('url');
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.default.dirname(__filename);
	dotenv.config({ path: path.default.resolve(__dirname, '..', '..', '.env') });
}

const ENV = {
	PORT: process.env.PORT || 5000,
	MONGO_URI: process.env.MONGO_URI,
	JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key'
}

export default ENV;