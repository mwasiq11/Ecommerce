import express from 'express';
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	getMyProducts,
	updateProduct
} from '../controllers/product.controller.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/my', auth, getMyProducts);
router.get('/:id', getProductById);
router.post('/', auth, createProduct);           // Any authenticated user can create
router.put('/:id', auth, updateProduct);          // Any authenticated user can update
router.delete('/:id', auth, deleteProduct);       // Any authenticated user can delete

export default router;
