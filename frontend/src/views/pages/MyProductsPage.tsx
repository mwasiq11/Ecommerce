
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/apiService';
import Button from '../../components/ui/Button';

const MyProductsPage: React.FC = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        if (!token) { setLoading(false); return; }
        apiService.getMyProducts()
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [token]);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        setDeleting(id);
        try {
            await apiService.deleteProduct(id);
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch (err: any) {
            alert(err.message || 'Failed to delete product');
        } finally {
            setDeleting(null);
        }
    };

    if (!user) {
        return (
            <main className="container mx-auto px-4 py-24 text-center">
                <div className="bg-white p-12 rounded-lg border border-border-color max-w-md mx-auto shadow-sm">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-xl font-bold mb-2">Please sign in</h2>
                    <p className="text-gray-500 mb-6">You need to log in to see your products.</p>
                    <Button onClick={() => navigate('/login')}>Sign In</Button>
                </div>
            </main>
        );
    }

    if (loading) {
        return (
            <main className="container mx-auto px-4 py-20 text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading your products...</p>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
                    <p className="text-gray-500 mt-1">{products.length} product{products.length !== 1 ? 's' : ''} listed</p>
                </div>
                <Link to="/sell">
                    <Button size="lg" className="shadow-lg shadow-primary/20">
                        <span className="flex items-center gap-2">➕ Add New Product</span>
                    </Button>
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="bg-white p-20 rounded-xl text-center border border-border-color shadow-sm">
                    <div className="text-6xl mb-4">📦</div>
                    <h2 className="text-xl font-bold mb-2">No products yet</h2>
                    <p className="text-gray-500 mb-6">Start selling by listing your first product!</p>
                    <Link to="/sell">
                        <Button size="lg">List Your First Product</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(prod => (
                        <div key={prod._id} className="bg-white border border-border-color rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                            <Link to={`/product/${prod._id}`} className="block">
                                <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
                                    {prod.image ? (
                                        <img
                                            src={prod.image.startsWith('/uploads') ? `http://localhost:5000${prod.image}` : prod.image}
                                            alt={prod.title}
                                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
                                        />
                                    ) : (
                                        <div className="text-gray-300 text-6xl">📷</div>
                                    )}
                                </div>
                            </Link>
                            <div className="p-4 space-y-2">
                                <h3 className="font-medium text-gray-800 line-clamp-2 text-sm">{prod.title}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg text-gray-900">${Number(prod.price).toFixed(2)}</span>
                                    {prod.originalPrice && (
                                        <span className="text-gray-400 text-sm line-through">${Number(prod.originalPrice).toFixed(2)}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="bg-gray-100 px-2 py-0.5 rounded">{prod.category}</span>
                                    <span>Stock: {prod.stock || 0}</span>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => handleDelete(prod._id)}
                                        disabled={deleting === prod._id}
                                        className="flex-1 px-3 py-1.5 text-xs font-bold text-danger border border-danger rounded-lg hover:bg-red-50 transition disabled:opacity-50"
                                    >
                                        {deleting === prod._id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default MyProductsPage;
