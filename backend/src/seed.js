import Product from './models/product.model.js';
import User from './models/user.model.js';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';

const seedProducts = [
    { title: 'Canon Camera EOS 2000, Black 10x zoom', price: 998.00, originalPrice: 1128.00, description: 'Professional grade DSLR camera for high-quality photography and 4K video recording.', rating: 4.5, orders: 154, shipping: 'Free Shipping', category: 'Computer and tech', brand: 'Canon', condition: 'Brand new', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&h=500&q=80', stock: 12 },
    { title: 'GoPro HERO6 4K Action Camera - Black', price: 998.00, description: 'Rugged and waterproof action camera for extreme sports and outdoor adventures.', rating: 4.8, orders: 89, shipping: 'Free Shipping', category: 'Computer and tech', brand: 'GoPro', condition: 'Brand new', image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=500&h=500&q=80', stock: 5 },
    { title: 'Samsung Galaxy Watch 4 Classic', price: 240.00, originalPrice: 299.00, description: 'Advanced smartwatch with fitness tracking and seamless smartphone integration.', rating: 4.2, orders: 342, shipping: 'Paid Shipping', category: 'Electronics', brand: 'Samsung', condition: 'Refurbished', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&h=500&q=80', stock: 20 },
    { title: 'Modern Leather Sofa - Gray Luxury', price: 1200.00, description: 'Stylish and comfortable genuine leather sofa for your modern home interior.', rating: 4.9, orders: 12, shipping: 'Free Shipping', category: 'Home interiors', brand: 'Generic', condition: 'Brand new', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&h=500&q=80', stock: 2 },
    { title: 'Apple MacBook Pro 14 M2 Chip', price: 1999.00, description: 'Powerful laptop for professionals with the latest M2 silicon architecture.', rating: 5.0, orders: 54, shipping: 'Free Shipping', category: 'Computer and tech', brand: 'Apple', condition: 'Brand new', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&h=500&q=80', stock: 8 },
    { title: 'Professional Tool Set 150pcs Industrial', price: 150.00, description: 'Complete chrome-vanadium tool kit for all your machinery and home repair needs.', rating: 4.6, orders: 210, shipping: 'Free Shipping', category: 'Tools, equipments', brand: 'DeWalt', condition: 'Brand new', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&h=500&q=80', stock: 45 },
    { title: 'Smart Home Speaker Echo Dot', price: 49.99, description: 'Voice-controlled smart speaker with Alexa assistant integration.', rating: 4.4, orders: 512, shipping: 'Free Shipping', category: 'Computer and tech', brand: 'Amazon', condition: 'Brand new', image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=500&h=500&q=80', stock: 100 },
    { title: 'Blue Cotton Casual Shirt', price: 25.00, description: 'Comfortable 100% cotton shirt for daily wear.', rating: 4.1, orders: 890, shipping: 'Paid Shipping', category: 'Clothes and wear', brand: 'Uniqlo', condition: 'Brand new', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&h=500&q=80', stock: 50 },
    { title: 'Wireless Gaming Headphones', price: 129.00, description: 'High-fidelity audio with ultra-low latency wireless connection.', rating: 4.7, orders: 123, shipping: 'Free Shipping', category: 'Computer and tech', brand: 'Sony', condition: 'Brand new', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&h=500&q=80', stock: 30 },
    { title: 'Designer Minimalist Watch', price: 150.00, description: 'Classic analog watch with a clean dial and leather strap.', rating: 4.3, orders: 45, shipping: 'Free Shipping', category: 'Clothes and wear', brand: 'Fossil', condition: 'Brand new', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&h=500&q=80', stock: 15 }
];

const seedDB = async () => {
    try {
        await connectDB();
        await Product.deleteMany({});
        await User.deleteMany({});

        const products = await Product.insertMany(seedProducts);
        console.log(`Seeded ${products.length} products`);

        const salt = await bcrypt.genSalt(10);
        const demoPass = await bcrypt.hash('demo123', salt);
        const adminPass = await bcrypt.hash('admin123', salt);

        await User.create({ name: 'Demo User', email: 'demo@marketplace.com', password: demoPass, phone: '+1 234 567 8900', address: '123 Main St, New York, NY 10001', avatar: 'https://i.pravatar.cc/150?u=demo', role: 'user' });
        await User.create({ name: 'Admin', email: 'admin@marketplace.com', password: adminPass, role: 'admin', avatar: 'https://i.pravatar.cc/150?u=admin' });

        console.log('Seeded demo user: demo@marketplace.com / demo123');
        console.log('Seeded admin user: admin@marketplace.com / admin123');
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error.message);
        process.exit(1);
    }
};

seedDB();
