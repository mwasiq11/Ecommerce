
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/apiService';
import Button from '../../components/ui/Button';

const CATEGORIES = [
    'Electronics', 'Computer and tech', 'Clothes and wear', 'Home interiors',
    'Tools, equipments', 'Sports and outdoor', 'Automobiles', 'Animal and pets',
    'Machinery tools', 'Other'
];

const CONDITIONS = ['Brand new', 'Refurbished', 'Old items'];

const SellProductPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        originalPrice: '',
        description: '',
        category: 'Electronics',
        brand: '',
        condition: 'Brand new',
        stock: '',
        shipping: 'Free Shipping',
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!user) {
        return (
            <main className="container mx-auto px-4 py-24 text-center">
                <div className="bg-white p-12 rounded-lg border border-border-color max-w-md mx-auto shadow-sm">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-xl font-bold mb-2">Please sign in</h2>
                    <p className="text-gray-500 mb-6">You need to log in to sell products.</p>
                    <Button onClick={() => navigate('/login')}>Sign In</Button>
                </div>
            </main>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setImagePreview(base64);
            setImageBase64(base64);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.title.trim()) { setError('Product title is required'); return; }
        if (!formData.price || Number(formData.price) <= 0) { setError('Valid price is required'); return; }

        setLoading(true);
        try {
            const productData = {
                title: formData.title,
                price: Number(formData.price),
                originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
                description: formData.description,
                category: formData.category,
                brand: formData.brand || 'Generic',
                condition: formData.condition,
                stock: formData.stock ? Number(formData.stock) : 0,
                shipping: formData.shipping,
                image: imageBase64 || '',
            };

            await apiService.createProduct(productData);
            setSuccess('Product listed successfully! 🎉');
            setFormData({
                title: '', price: '', originalPrice: '', description: '',
                category: 'Electronics', brand: '', condition: 'Brand new',
                stock: '', shipping: 'Free Shipping'
            });
            setImagePreview(null);
            setImageBase64('');

            setTimeout(() => navigate('/my-products'), 1500);
        } catch (err: any) {
            setError(err.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Sell a Product</h1>
                <p className="text-gray-500 mt-2">Fill in the details to list your product on the marketplace</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                    <span>⚠️</span> {error}
                </div>
            )}
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                    <span>✅</span> {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Upload */}
                <div className="bg-white border border-border-color rounded-xl p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-xl">📷</span> Product Image
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50/30 transition-all group overflow-hidden bg-gray-50"
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <>
                                    <svg className="w-10 h-10 text-gray-300 group-hover:text-primary mb-2 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xs text-gray-400 group-hover:text-primary transition">Click to upload</span>
                                </>
                            )}
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        <div className="text-sm text-gray-500 space-y-1">
                            <p className="font-medium text-gray-700">Upload Product Image</p>
                            <p>Accepted formats: JPG, PNG, WebP</p>
                            <p>Max file size: 5MB</p>
                            {imagePreview && (
                                <button type="button" onClick={() => { setImagePreview(null); setImageBase64(''); }} className="text-danger font-medium hover:underline mt-2">
                                    Remove image
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="bg-white border border-border-color rounded-xl p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="text-xl">📝</span> Product Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-sm font-medium text-gray-700">Product Title <span className="text-danger">*</span></label>
                            <input
                                type="text" name="title" value={formData.title} onChange={handleChange}
                                placeholder="e.g. Apple MacBook Pro 14 M2 Chip"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Price ($) <span className="text-danger">*</span></label>
                            <input
                                type="number" name="price" value={formData.price} onChange={handleChange}
                                placeholder="0.00" step="0.01" min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Original Price ($) <span className="text-gray-400 text-xs">(optional)</span></label>
                            <input
                                type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange}
                                placeholder="0.00" step="0.01" min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary bg-white transition">
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Brand</label>
                            <input
                                type="text" name="brand" value={formData.brand} onChange={handleChange}
                                placeholder="e.g. Apple, Samsung"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Condition</label>
                            <select name="condition" value={formData.condition} onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary bg-white transition">
                                {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Stock Quantity</label>
                            <input
                                type="number" name="stock" value={formData.stock} onChange={handleChange}
                                placeholder="0" min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Shipping</label>
                            <select name="shipping" value={formData.shipping} onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary bg-white transition">
                                <option value="Free Shipping">Free Shipping</option>
                                <option value="Paid Shipping">Paid Shipping</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description" value={formData.description} onChange={handleChange}
                                placeholder="Describe your product in detail..."
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <Button variant="outline" type="button" onClick={() => navigate(-1)} className="px-8">Cancel</Button>
                    <Button type="submit" size="lg" className="px-8 shadow-lg shadow-primary/20" disabled={loading}>
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Listing Product...
                            </span>
                        ) : '🚀 List Product for Sale'}
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default SellProductPage;
