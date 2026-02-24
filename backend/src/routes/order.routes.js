import express from 'express';
import {
	createOrder,
	deleteOrder,
	getOrderById,
	getOrders,
	getMyOrders,
	updateOrderStatus
} from '../controllers/order.controller.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/my', auth, getMyOrders);
router.get('/', auth, adminOnly, getOrders);
router.get('/:id', auth, getOrderById);
router.post('/', auth, createOrder);
router.patch('/:id/status', auth, adminOnly, updateOrderStatus);
router.delete('/:id', auth, adminOnly, deleteOrder);

export default router;
