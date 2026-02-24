import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ENV from "./config/env.js";
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import orderRoutes from './routes/order.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = ENV.PORT;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Root route – fixes "Cannot GET /"
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

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});

