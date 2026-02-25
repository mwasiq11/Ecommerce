
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { Product } from '../../types';
import { useCartController } from '../../controllers/useCartController';
import Button from '../../components/ui/Button';
import { getImageUrl } from '../../utils/url';

const getImageSrc = (image: string) => {
    if (!image) return 'https://via.placeholder.com/400x400?text=No+Image';
    return getImageUrl(image) || image;
};

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { addToCart } = useCartController();
    const [product, setProduct] = useState<Product | null>(null);
    const [seller, setSeller] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('Description');
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (!productId) return;
        apiService.getProductById(productId)
            .then((p: any) => {
                setProduct({ id: p._id, title: p.title, price: p.price, originalPrice: p.originalPrice, description: p.description, rating: p.rating, orders: p.orders, shipping: p.shipping, category: p.category, brand: p.brand, condition: p.condition, image: p.image, stock: p.stock });
                if (p.seller) setSeller(p.seller);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [productId]);

    const handleAddToCart = () => {
        if (!product) return;
        for (let i = 0; i < quantity; i++) addToCart(product);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    if (loading || !product) return (
        <main className="container mx-auto px-4 py-20 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </main>
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link to="/" className="hover:text-primary">Home</Link> › <Link to="/listing" className="hover:text-primary">{product.category}</Link> › <span className="text-gray-800 font-medium truncate">{product.title}</span>
            </div>

            <div className="bg-white border border-border-color rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-sm">
                <div className="lg:w-1/2 p-8 border-r border-border-color">
                    <div className="aspect-square bg-gray-50 rounded-lg border border-border-color flex items-center justify-center p-12 group cursor-zoom-in overflow-hidden">
                        <img
                            src={getImageSrc(product.image)}
                            alt={product.title}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=No+Image'; }}
                        />
                    </div>
                </div>
                <div className="lg:w-1/2 p-8 space-y-6">
                    <div className="space-y-2">
                        <p className="text-success font-bold text-sm">✓ {product.stock && product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</p>
                        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="text-warning">{'★'.repeat(Math.floor(product.rating))} {product.rating}</span>
                            <span>• {product.orders} orders</span>
                            <span>• {product.shipping}</span>
                        </div>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-warning">
                        <p className="text-3xl font-extrabold text-danger">${product.price.toFixed(2)}</p>
                        {product.originalPrice && <p className="text-sm text-gray-500 line-through mt-1">${product.originalPrice.toFixed(2)}</p>}
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 text-sm py-2 border-b border-gray-100"><span className="text-gray-400">Brand:</span><span className="col-span-2 text-gray-700 font-medium">{product.brand}</span></div>
                        <div className="grid grid-cols-3 text-sm py-2 border-b border-gray-100"><span className="text-gray-400">Category:</span><span className="col-span-2 text-gray-700 font-medium">{product.category}</span></div>
                        <div className="grid grid-cols-3 text-sm py-2 border-b border-gray-100"><span className="text-gray-400">Condition:</span><span className="col-span-2 text-gray-700 font-medium">{product.condition}</span></div>
                        {seller && (
                            <div className="grid grid-cols-3 text-sm py-2 border-b border-gray-100">
                                <span className="text-gray-400">Seller:</span>
                                <span className="col-span-2 text-gray-700 font-medium flex items-center gap-2">
                                    {seller.avatar && <img src={seller.avatar} className="w-6 h-6 rounded-full" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                                    {seller.name}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden h-12">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-5 py-2 hover:bg-gray-100 font-bold">-</button>
                            <span className="w-12 text-center font-bold">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="px-5 py-2 hover:bg-gray-100 font-bold">+</button>
                        </div>
                        <Button size="lg" className="flex-1 h-12 text-lg rounded-lg shadow-lg shadow-primary/20" onClick={handleAddToCart}>
                            {addedToCart ? '✓ Added!' : 'Add to Cart'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-12 bg-white border border-border-color rounded-lg overflow-hidden shadow-sm">
                <div className="flex border-b border-border-color bg-gray-50/50">
                    {['Description', 'Reviews', 'Shipping'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-4 font-bold text-sm transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary bg-white' : 'text-gray-400 hover:text-gray-600'}`}>{tab}</button>
                    ))}
                </div>
                <div className="p-8">
                    {activeTab === 'Description' && <div className="text-gray-600 leading-relaxed max-w-4xl"><p className="text-lg">{product.description}</p></div>}
                    {activeTab === 'Reviews' && (
                        <div className="space-y-6">
                            <div className="text-center"><p className="text-5xl font-extrabold mb-2">{product.rating}</p><div className="text-warning text-2xl">{'★'.repeat(Math.floor(product.rating))}</div><p className="text-sm text-gray-400 mt-2">{product.orders} customer reviews</p></div>
                        </div>
                    )}
                    {activeTab === 'Shipping' && <p className="text-gray-600">{product.shipping}. Estimated delivery: 5-10 business days.</p>}
                </div>
            </div>
        </main>
    );
};

export default ProductDetailPage;
