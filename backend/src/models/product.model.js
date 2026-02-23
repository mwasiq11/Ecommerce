import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		price: { type: Number, required: true, min: 0 },
		description: { type: String, default: '' },
		inStock: { type: Boolean, default: true },
		category: { type: String, default: 'general' }
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
