import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
	try {
		const { q, category, brand, minPrice, maxPrice, condition, sort } = req.query;
		let filter = {};

		// Text search
		if (q) {
			filter.$or = [
				{ title: { $regex: q, $options: 'i' } },
				{ description: { $regex: q, $options: 'i' } },
				{ brand: { $regex: q, $options: 'i' } },
				{ category: { $regex: q, $options: 'i' } }
			];
		}

		if (category) filter.category = { $regex: category, $options: 'i' };
		if (brand) filter.brand = { $regex: brand, $options: 'i' };
		if (condition && condition !== 'Any') filter.condition = condition;
		if (minPrice || maxPrice) {
			filter.price = {};
			if (minPrice) filter.price.$gte = Number(minPrice);
			if (maxPrice) filter.price.$lte = Number(maxPrice);
		}

		// Sorting
		let sortOption = { createdAt: -1 };
		if (sort === 'price_asc') sortOption = { price: 1 };
		else if (sort === 'price_desc') sortOption = { price: -1 };
		else if (sort === 'rating') sortOption = { rating: -1 };
		else if (sort === 'newest') sortOption = { createdAt: -1 };

		const products = await Product.find(filter)
			.populate('seller', 'name email avatar')
			.sort(sortOption);
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
			.populate('seller', 'name email avatar');
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { title, price, originalPrice, description, category, brand, condition, stock, shipping, image } = req.body;

		if (!title || !price) {
			return res.status(400).json({ message: 'Title and price are required' });
		}

		// Image is stored directly as-is (base64 data URL or external URL)
		const product = await Product.create({
			title,
			price: Number(price),
			originalPrice: originalPrice ? Number(originalPrice) : null,
			description: description || '',
			category: category || 'general',
			brand: brand || 'Generic',
			condition: condition || 'Brand new',
			stock: stock ? Number(stock) : 0,
			shipping: shipping || 'Free Shipping',
			image: image || '',
			seller: req.user.id
		});

		const populated = await Product.findById(product._id).populate('seller', 'name email avatar');
		res.status(201).json(populated);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const updateProduct = async (req, res) => {
	try {
		// Image is stored directly as-is (base64 data URL or external URL)
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		}).populate('seller', 'name email avatar');
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.status(200).json({ message: 'Product deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getMyProducts = async (req, res) => {
	try {
		const products = await Product.find({ seller: req.user.id })
			.populate('seller', 'name email avatar')
			.sort({ createdAt: -1 });
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

