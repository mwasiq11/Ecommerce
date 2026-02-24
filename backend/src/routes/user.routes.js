import express from 'express';
import {
	createUser,
	deleteUser,
	getUserById,
	getUsers,
	getMe,
	loginUser,
	updateUser
} from '../controllers/user.controller.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me', auth, getMe);
router.get('/', auth, adminOnly, getUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, adminOnly, deleteUser);

export default router;
