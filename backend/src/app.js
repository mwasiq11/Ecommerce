import express from 'express';
import ENV from "./config/env.js";
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();
const PORT = ENV.PORT;

// CORS: allow frontend origin in production
const allowedOrigins = process.env.FRONTEND_URL
	? [process.env.FRONTEND_URL]
	: ['http://localhost:3000'];

app.use(cors({
	origin: (origin, callback) => {
		// Allow requests with no origin (server-to-server, curl, etc.)
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(null, true); // permissive for now
		}
	},
	credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB on every request (uses cached connection)
app.use(async (_req, _res, next) => {
	try {
		await connectDB();
		next();
	} catch (err) {
		next(err);
	}
});

// Root route
app.get('/', (_req, res) => {
	res.status(200).json({
		message: 'MarketPlace Pro API',
		version: '1.0.0',
		endpoints: {
			health: '/api/health',
			products: '/api/products',
			users: '/api/users',
			orders: '/api/orders',
		}
	});
});

app.get('/api/health', (_req, res) => {
	res.status(200).json({ status: 'ok' });
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Only start the server when running locally (not on Vercel)
if (!process.env.VERCEL) {
	connectDB().then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	});
}

// Export for Vercel serverless
export default app;

