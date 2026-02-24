import express from 'express';
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct
} from '../controllers/product.controller.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', auth, adminOnly, createProduct);
router.put('/:id', auth, adminOnly, updateProduct);
router.delete('/:id', auth, adminOnly, deleteProduct);

export default router;
