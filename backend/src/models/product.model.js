import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		price: { type: Number, required: true, min: 0 },
		originalPrice: { type: Number, default: null },
		description: { type: String, default: '' },
		rating: { type: Number, default: 0, min: 0, max: 5 },
		orders: { type: Number, default: 0 },
		shipping: { type: String, default: 'Free Shipping' },
		category: { type: String, default: 'general' },
		brand: { type: String, default: 'Generic' },
		condition: { type: String, enum: ['Any', 'Refurbished', 'Brand new', 'Old items'], default: 'Brand new' },
		image: { type: String, default: '' },
		stock: { type: Number, default: 0 }
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
