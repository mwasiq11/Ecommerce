import Order from '../models/order.model.js';

export const getOrders = async (_req, res) => {
	try {
		const orders = await Order.find()
			.populate('user', 'name email')
			.populate('items.product', 'name price')
			.sort({ createdAt: -1 });
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
			.populate('user', 'name email')
			.populate('items.product', 'name price');
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
		const order = await Order.create(req.body);
		res.status(201).json(order);
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
		);
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
