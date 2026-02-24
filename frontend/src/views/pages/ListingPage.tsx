
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { Product } from '../../types';
import Button from '../../components/ui/Button';

const mapProduct = (p: any): Product => ({ id: p._id, title: p.title, price: p.price, originalPrice: p.originalPrice, description: p.description, rating: p.rating, orders: p.orders, shipping: p.shipping, category: p.category, brand: p.brand, condition: p.condition, image: p.image, stock: p.stock });

const ListingPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiService.getProducts().then(data => setProducts(data.map(mapProduct))).catch(console.error).finally(() => setLoading(false));
    }, []);

    const filteredProducts = useMemo(() => {
        if (!query) return products;
        return products.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
    }, [query, products]);

    if (loading) return (
        <main className="container mx-auto px-4 py-20 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </main>
    );

    return (
        <main className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-primary">Home</Link> <span>›</span> <span className="font-medium text-gray-800">Products</span>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-1/4 space-y-6">
                    <div className="border-t border-border-color pt-4">
                        <h4 className="font-bold mb-4 text-gray-800">Category</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            {['Electronics', 'Computer and tech', 'Clothes and wear', 'Home interiors', 'Tools, equipments'].map(c => (
                                <li key={c}><Link to={`/listing?q=${c}`} className="cursor-pointer hover:text-primary">{c}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-t border-border-color pt-4">
                        <h4 className="font-bold mb-4 text-gray-800">Brands</h4>
                        <div className="space-y-3">
                            {['Samsung', 'Apple', 'Canon', 'Sony', 'GoPro'].map(brand => (
                                <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-5 h-5 border-gray-300 rounded text-primary" />
                                    <span className="text-gray-600 text-sm group-hover:text-gray-900">{brand}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="flex-1">
                    <div className="bg-white border border-border-color rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                        <p className="text-gray-700 text-sm">{filteredProducts.length} items {query ? `for "${query}"` : ''}</p>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none bg-white">
                                <option>Featured</option><option>Price: Low to High</option><option>Newest</option>
                            </select>
                            <div className="flex border border-gray-300 rounded overflow-hidden">
                                <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-primary' : 'bg-white text-gray-400'}`}>▦</button>
                                <button onClick={() => setViewMode('list')} className={`p-2 border-l border-gray-300 ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'bg-white text-gray-400'}`}>☰</button>
                            </div>
                        </div>
                    </div>
                    {filteredProducts.length === 0 ? (
                        <div className="bg-white p-20 rounded-lg text-center border border-border-color"><div className="text-6xl mb-4">🔍</div><h2 className="text-xl font-bold mb-2">No products found</h2><p className="text-gray-500">Try adjusting your search or filters.</p></div>
                    ) : (
                        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                            {filteredProducts.map(prod => (
                                <div key={prod.id} className={`bg-white border border-border-color rounded-lg overflow-hidden flex shadow-sm hover:shadow-md transition-shadow ${viewMode === 'grid' ? 'flex-col' : 'flex-row'}`}>
                                    <Link to={`/product/${prod.id}`} className={`${viewMode === 'grid' ? 'w-full aspect-square' : 'w-1/3 min-w-[200px] p-6'} flex items-center justify-center bg-gray-50/50 group`}>
                                        <img src={prod.image} alt={prod.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                                    </Link>
                                    <div className="flex-1 p-6 flex flex-col">
                                        <Link to={`/product/${prod.id}`} className="font-medium text-gray-800 hover:text-primary line-clamp-2 mb-2">{prod.title}</Link>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xl font-bold text-gray-900">${prod.price.toFixed(2)}</span>
                                            {prod.originalPrice && <span className="text-gray-400 line-through text-sm">${prod.originalPrice.toFixed(2)}</span>}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                            <span className="text-warning">{'★'.repeat(Math.floor(prod.rating))} {prod.rating}</span>
                                            <span>• {prod.orders} orders</span>
                                            <span className="text-success font-bold">• {prod.shipping}</span>
                                        </div>
                                        {viewMode === 'list' && <p className="text-gray-500 text-sm mb-4 line-clamp-2">{prod.description}</p>}
                                        <Link to={`/product/${prod.id}`} className="text-primary font-bold text-sm hover:underline mt-auto">View details</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ListingPage;
