import express from 'express';
import ENV from "./config/env.js";
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();
const PORT = ENV.PORT;

app.use(cors());
app.use(express.json());

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

