
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { Product } from '../../types';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const mapProduct = (p: any): Product => ({ id: p._id, title: p.title, price: p.price, originalPrice: p.originalPrice, description: p.description, rating: p.rating, orders: p.orders, shipping: p.shipping, category: p.category, brand: p.brand, condition: p.condition, image: p.image, stock: p.stock });

const GiftBoxesPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => { apiService.getProducts().then(data => setProducts(data.map(mapProduct))).catch(console.error); }, []);

    const bundles = [
        { title: 'Tech Starter Pack', price: 1299.99, items: 3, image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&h=400' },
        { title: 'Home Office Deluxe', price: 450.00, items: 5, image: 'https://images.unsplash.com/photo-1593642702749-b7d2a5482bb6?auto=format&fit=crop&w=400&h=400' },
        { title: 'Photography Pro Kit', price: 1800.00, items: 4, image: 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=400&h=400' },
        { title: 'Gamer Elite Bundle', price: 899.00, items: 6, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&h=400' }
    ];

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="bg-gradient-to-r from-[#0D6EFD] to-[#0052cc] rounded-3xl p-12 mb-16 text-white overflow-hidden relative shadow-2xl" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&h=600&q=80')`, backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}>
                <div className="relative z-10 max-w-xl">
                    <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block">Limited Edition</span>
                    <h1 className="text-6xl font-extrabold mb-6 leading-tight">Curated Gift Boxes</h1>
                    <p className="text-xl opacity-90 mb-8">The perfect selection for corporate gifting or personal celebrations.</p>
                    <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100 px-10 rounded-full font-bold">Explore</Button>
                </div>
            </div>
            <h2 className="text-3xl font-bold mb-10">Featured Bundles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {bundles.map((b, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden border border-border-color shadow-sm hover:shadow-2xl transition-all group">
                        <div className="h-56 flex items-center justify-center p-8 bg-gray-50"><img src={b.image} alt={b.title} className="max-w-full max-h-full object-contain rounded-xl group-hover:scale-110 transition-transform duration-700" /></div>
                        <div className="p-8"><h3 className="font-bold text-xl mb-1 group-hover:text-primary">{b.title}</h3><p className="text-gray-400 text-sm mb-6">{b.items} Products</p><div className="flex justify-between items-center"><span className="text-2xl font-bold">${b.price}</span><Button size="sm" className="rounded-full px-6">Add to Cart</Button></div></div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-end mb-10"><h2 className="text-3xl font-bold">Build Your Own Box</h2><Link to="/listing" className="text-primary font-bold hover:underline">View all →</Link></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.slice(0, 10).map(prod => (
                    <div key={prod.id} className="bg-white border border-border-color rounded-2xl p-6 flex flex-col items-center text-center hover:border-primary hover:shadow-lg transition-all group">
                        <div className="w-32 h-32 flex items-center justify-center mb-6 bg-gray-50 rounded-xl overflow-hidden"><img src={prod.image} className="max-w-[70%] max-h-[70%] object-contain group-hover:scale-110 transition-transform" alt="" /></div>
                        <h4 className="text-sm font-bold line-clamp-1 mb-2">{prod.title}</h4>
                        <p className="font-extrabold text-primary mb-4 text-lg">${prod.price}</p>
                        <button className="text-xs font-bold border-2 border-gray-100 px-6 py-2 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all">+ Add</button>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default GiftBoxesPage;
