import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
	{
		product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
		quantity: { type: Number, required: true, min: 1 },
		price: { type: Number, required: true, min: 0 }
	},
	{ _id: false }
);

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		items: { type: [orderItemSchema], default: [] },
		totalAmount: { type: Number, required: true, min: 0 },
		shippingAddress: {
			fullName: { type: String, default: '' },
			address: { type: String, default: '' },
			city: { type: String, default: '' },
			postalCode: { type: String, default: '' },
			country: { type: String, default: '' },
			phone: { type: String, default: '' }
		},
		paymentMethod: { type: String, default: 'Cash on Delivery' },
		status: {
			type: String,
			enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
			default: 'pending'
		}
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
