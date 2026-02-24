
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { Product } from '../../types';
import Button from '../../components/ui/Button';

const mapProduct = (p: any): Product => ({ id: p._id, title: p.title, price: p.price, originalPrice: p.originalPrice, description: p.description, rating: p.rating, orders: p.orders, shipping: p.shipping, category: p.category, brand: p.brand, condition: p.condition, image: p.image, stock: p.stock });

const CATEGORIES_LIST = ['Electronics', 'Computer and tech', 'Clothes and wear', 'Home interiors', 'Tools, equipments', 'Sports and outdoor'];

const ListingPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const activeCategory = searchParams.get('category') || '';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        setLoading(true);
        const params: any = {};
        if (query) params.q = query;
        if (activeCategory) params.category = activeCategory;
        if (sortBy) params.sort = sortBy;

        apiService.getProducts(params)
            .then(data => setProducts(data.map(mapProduct)))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [query, activeCategory, sortBy]);

    const handleCategoryClick = (cat: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (activeCategory === cat) {
            newParams.delete('category');
        } else {
            newParams.set('category', cat);
        }
        setSearchParams(newParams);
    };

    const getImageSrc = (image: string) => {
        if (!image) return 'https://via.placeholder.com/300x300?text=No+Image';
        if (image.startsWith('/uploads')) return `http://localhost:5000${image}`;
        return image;
    };

    if (loading) return (
        <main className="container mx-auto px-4 py-20 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading products...</p>
        </main>
    );

    return (
        <main className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-primary">Home</Link> <span>›</span> <span className="font-medium text-gray-800">Products</span>
                {query && <><span>›</span><span className="text-primary font-medium">"{query}"</span></>}
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-1/4 space-y-6">
                    <div className="border-t border-border-color pt-4">
                        <h4 className="font-bold mb-4 text-gray-800">Category</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            {CATEGORIES_LIST.map(c => (
                                <li key={c}>
                                    <button
                                        onClick={() => handleCategoryClick(c)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition ${activeCategory === c ? 'bg-primary text-white font-bold' : 'hover:bg-blue-50 hover:text-primary'}`}
                                    >
                                        {c}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {activeCategory && (
                            <button onClick={() => { const p = new URLSearchParams(searchParams); p.delete('category'); setSearchParams(p); }}
                                className="text-xs text-primary font-bold mt-3 hover:underline">
                                Clear category filter
                            </button>
                        )}
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
                        <p className="text-gray-700 text-sm">
                            {products.length} item{products.length !== 1 ? 's' : ''} {query ? `for "${query}"` : ''} {activeCategory ? `in ${activeCategory}` : ''}
                        </p>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none bg-white"
                            >
                                <option value="newest">Newest</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="rating">Best Rating</option>
                            </select>
                            <div className="flex border border-gray-300 rounded overflow-hidden">
                                <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-primary' : 'bg-white text-gray-400'}`}>▦</button>
                                <button onClick={() => setViewMode('list')} className={`p-2 border-l border-gray-300 ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'bg-white text-gray-400'}`}>☰</button>
                            </div>
                        </div>
                    </div>
                    {products.length === 0 ? (
                        <div className="bg-white p-20 rounded-lg text-center border border-border-color">
                            <div className="text-6xl mb-4">🔍</div>
                            <h2 className="text-xl font-bold mb-2">No products found</h2>
                            <p className="text-gray-500">Try adjusting your search or filters.</p>
                        </div>
                    ) : (
                        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                            {products.map(prod => (
                                <div key={prod.id} className={`bg-white border border-border-color rounded-lg overflow-hidden flex shadow-sm hover:shadow-md transition-shadow ${viewMode === 'grid' ? 'flex-col' : 'flex-row'}`}>
                                    <Link to={`/product/${prod.id}`} className={`${viewMode === 'grid' ? 'w-full aspect-square' : 'w-1/3 min-w-[200px] p-6'} flex items-center justify-center bg-gray-50/50 group overflow-hidden`}>
                                        <img
                                            src={getImageSrc(prod.image)}
                                            alt={prod.title}
                                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
                                        />
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
