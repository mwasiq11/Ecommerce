import Order from '../models/order.model.js';
import User from '../models/user.model.js';

export const getOrders = async (_req, res) => {
	try {
		const orders = await Order.find()
			.populate('user', 'name email avatar phone address')
			.populate('items.product', 'title price image description brand category')
			.sort({ createdAt: -1 });
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getMyOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user.id })
			.populate('items.product', 'title price image description brand category')
			.sort({ createdAt: -1 });
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
			.populate('user', 'name email avatar phone address')
			.populate('items.product', 'title price image description brand category');
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		res.status(200).json(order);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createOrder = async (req, res) => {
	try {
		const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

		if (!items || items.length === 0) {
			return res.status(400).json({ message: 'No items in the order' });
		}

		// Get user details for shipping address if not provided
		const user = await User.findById(req.user.id).select('-password');

		const finalShippingAddress = shippingAddress || {
			fullName: user?.name || '',
			address: user?.address || '',
			city: '',
			postalCode: '',
			country: '',
			phone: user?.phone || ''
		};

		const order = await Order.create({
			user: req.user.id,
			items,
			totalAmount,
			shippingAddress: finalShippingAddress,
			paymentMethod: paymentMethod || 'Cash on Delivery',
			status: 'pending'
		});

		const populated = await Order.findById(order._id)
			.populate('user', 'name email avatar phone address')
			.populate('items.product', 'title price image description brand category');

		res.status(201).json(populated);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const updateOrderStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ status },
			{ new: true, runValidators: true }
		)
			.populate('user', 'name email avatar phone address')
			.populate('items.product', 'title price image description brand category');
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		res.status(200).json(order);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const deleteOrder = async (req, res) => {
	try {
		const order = await Order.findByIdAndDelete(req.params.id);
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		res.status(200).json({ message: 'Order deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
