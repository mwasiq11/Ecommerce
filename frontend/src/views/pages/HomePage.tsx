
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../constants';
import { apiService } from '../../services/apiService';
import { Product } from '../../types';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const mapProduct = (p: any): Product => ({
    id: p._id, title: p.title, price: p.price, originalPrice: p.originalPrice,
    description: p.description, rating: p.rating, orders: p.orders, shipping: p.shipping,
    category: p.category, brand: p.brand, condition: p.condition, image: p.image, stock: p.stock,
});

const HomePage: React.FC = () => {
    const { user, logout } = useAuth();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 23, min: 59, sec: 59 });
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiService.getProducts().then(data => setProducts(data.map(mapProduct))).catch(console.error).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
                if (prev.min > 0) return { ...prev, min: prev.min - 1, sec: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, min: 59, sec: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (loading) return (
        <main className="container mx-auto px-4 py-20 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading products...</p>
        </main>
    );

    return (
        <main className="container mx-auto px-4 py-8 space-y-12">
            {/* HERO */}
            <section className="bg-white border border-border-color rounded-lg p-5 flex flex-col lg:flex-row gap-5 shadow-sm">
                <div className="lg:w-1/4 hidden lg:block">
                    <ul className="space-y-1">
                        {CATEGORIES.map(cat => (
                            <li key={cat.id}><button className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-primary rounded-md transition text-gray-700 font-medium">{cat.name}</button></li>
                        ))}
                    </ul>
                </div>
                <div className="lg:w-2/4 relative min-h-[400px] bg-cover bg-center rounded-lg overflow-hidden flex items-center p-12" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=600')` }}>
                    <div className="bg-gradient-to-r from-blue-900/60 to-transparent absolute inset-0"></div>
                    <div className="relative z-10 max-w-sm text-white">
                        <h2 className="text-2xl font-normal mb-1">Latest trending</h2>
                        <h1 className="text-4xl font-bold mb-6">Electronic items</h1>
                        <Button variant="secondary" size="lg" className="bg-white text-gray-900 hover:bg-gray-100 border-none px-8">Source now</Button>
                    </div>
                </div>
                <div className="lg:w-1/4 flex flex-col gap-3">
                    <div className="bg-[#E3F0FF] p-4 rounded-lg">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={user.avatar || `https://i.pravatar.cc/100?u=${user.email}`} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="" />
                                    <p className="text-sm font-medium text-gray-800 leading-tight">Hi, {user.name.split(' ')[0]}<br /><span className="text-gray-500 text-xs">Welcome back!</span></p>
                                </div>
                                <Link to="/profile"><Button fullWidth size="sm" className="mb-2 shadow-sm">My Profile</Button></Link>
                                <Link to="/orders"><Button fullWidth variant="outline" size="sm" className="bg-white hover:border-primary mb-2">My Orders</Button></Link>
                                <button onClick={logout} className="w-full px-3 py-1.5 text-xs text-danger font-bold border-2 border-danger rounded-md hover:bg-red-50 transition-colors">Log Out</button>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 mb-4"><img src="https://i.pravatar.cc/100?u=user1" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="" /><p className="text-sm font-medium text-gray-800 leading-tight">Hi, user<br />let's get started</p></div>
                                <Link to="/register"><Button fullWidth size="sm" className="mb-2 shadow-sm">Join now</Button></Link>
                                <Link to="/login"><Button fullWidth variant="outline" size="sm" className="bg-white hover:border-primary">Log in</Button></Link>
                            </>
                        )}
                    </div>
                    <div className="bg-[#F38332] text-white p-5 rounded-lg flex-1 shadow-sm flex flex-col justify-center"><p className="text-sm font-medium opacity-90">Get US $10 off with a new supplier</p></div>
                    <div className="bg-[#55BDC3] text-white p-5 rounded-lg flex-1 shadow-sm flex flex-col justify-center"><p className="text-sm font-medium opacity-90">Send quotes with supplier preferences</p></div>
                </div>
            </section>

            {/* DEALS */}
            <section className="bg-white border border-border-color rounded-lg overflow-hidden flex flex-col md:flex-row shadow-sm">
                <div className="p-8 border-r border-border-color md:w-1/5 flex flex-col justify-center bg-gray-50/30">
                    <h3 className="text-xl font-bold mb-1">Deals and offers</h3>
                    <p className="text-gray-400 text-sm mb-6">Hygiene equipments</p>
                    <div className="flex gap-2">
                        {[{ val: timeLeft.days, label: 'Days' }, { val: timeLeft.hours, label: 'Hour' }, { val: timeLeft.min, label: 'Min' }, { val: timeLeft.sec, label: 'Sec' }].map((t, i) => (
                            <div key={i} className="bg-[#EB001B] text-white rounded-md w-12 py-2 flex flex-col items-center">
                                <span className="text-lg font-bold leading-none">{String(t.val).padStart(2, '0')}</span>
                                <span className="text-[10px] opacity-80 uppercase tracking-tighter">{t.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                    {products.slice(0, 5).map(prod => (
                        <Link to={`/product/${prod.id}`} key={prod.id} className="p-6 border-r border-border-color last:border-r-0 hover:bg-gray-50 transition flex flex-col items-center text-center group">
                            <div className="h-32 w-full flex items-center justify-center mb-4">
                                <img src={prod.image} alt={prod.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <p className="text-sm text-gray-700 mb-1 font-medium truncate w-full">{prod.title.split(',')[0]}</p>
                            {prod.originalPrice && <span className="bg-[#FFE3E3] text-[#EB001B] px-3 py-1 rounded-full text-xs font-bold">-{Math.round((1 - prod.price / prod.originalPrice) * 100)}%</span>}
                        </Link>
                    ))}
                </div>
            </section>

            {/* RECOMMENDED */}
            <section>
                <h3 className="text-2xl font-bold mb-8 text-gray-800">Recommended items</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {products.map(prod => (
                        <Link to={`/product/${prod.id}`} key={prod.id} className="bg-white border border-border-color rounded-xl p-5 hover:shadow-lg hover:border-primary transition-all group block shadow-sm">
                            <div className="aspect-square w-full mb-4 flex items-center justify-center bg-gray-50/50 rounded-lg overflow-hidden">
                                <img src={prod.image} alt={prod.title} className="max-h-[80%] max-w-[80%] object-contain group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <p className="font-bold text-lg mb-1 text-gray-900">${prod.price.toFixed(2)}</p>
                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{prod.title}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* SERVICES */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Source from Industry Hubs', icon: '🏭', img: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?auto=format&fit=crop&w=400&h=300' },
                    { title: 'Customize Your Products', icon: '🎨', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=400&h=300' },
                    { title: 'Fast, Reliable Shipping', icon: '✈️', img: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&w=400&h=300' },
                    { title: 'Product Monitoring', icon: '🛡️', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300' }
                ].map((s, i) => (
                    <div key={i} className="bg-white border border-border-color rounded-xl overflow-hidden shadow-sm group">
                        <div className="relative h-32"><img src={s.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" /><div className="absolute inset-0 bg-black/20"></div><div className="absolute bottom-[-20px] right-6 w-12 h-12 bg-[#D1E7FF] border-4 border-white rounded-full flex items-center justify-center text-xl shadow-md">{s.icon}</div></div>
                        <div className="p-6 pt-8"><h4 className="font-bold text-gray-800 text-sm leading-snug">{s.title}</h4></div>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default HomePage;
