import express from 'express';
import {
	createOrder,
	deleteOrder,
	getOrderById,
	getOrders,
	updateOrderStatus
} from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;
