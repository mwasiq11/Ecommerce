import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ENV from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateToken = (user) => {
	return jwt.sign(
		{ id: user._id, email: user.email, role: user.role },
		ENV.JWT_SECRET,
		{ expiresIn: '7d' }
	);
};

// Save a base64 image to the uploads/avatars directory, return the URL path
const saveAvatarImage = (base64String) => {
	const uploadsDir = path.join(__dirname, '..', '..', 'uploads', 'avatars');
	if (!fs.existsSync(uploadsDir)) {
		fs.mkdirSync(uploadsDir, { recursive: true });
	}

	const matches = base64String.match(/^data:image\/(\w+);base64,(.+)$/);
	if (!matches) return null;

	const ext = matches[1];
	const data = matches[2];
	const filename = `avatar_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
	const filepath = path.join(uploadsDir, filename);
	fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
	return `/uploads/avatars/${filename}`;
};

export const getUsers = async (_req, res) => {
	try {
		const users = await User.find().select('-password').sort({ createdAt: -1 });
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Name, email, and password are required' });
		}
		if (password.length < 6) {
			return res.status(400).json({ message: 'Password must be at least 6 characters' });
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User with this email already exists' });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = await User.create({ ...req.body, password: hashedPassword });
		const token = generateToken(user);
		const userObj = user.toObject();
		delete userObj.password;
		res.status(201).json({ user: userObj, token });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}
		const token = generateToken(user);
		const userObj = user.toObject();
		delete userObj.password;
		res.status(200).json({ user: userObj, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		// Handle password hashing
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(req.body.password, salt);
		}

		// Handle base64 avatar upload
		if (req.body.avatar && req.body.avatar.startsWith('data:image/')) {
			const avatarUrl = saveAvatarImage(req.body.avatar);
			if (avatarUrl) {
				req.body.avatar = avatarUrl;
			}
		}

		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		}).select('-password');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
