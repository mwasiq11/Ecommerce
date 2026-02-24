
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) { setLoading(false); return; }
        apiService.getMyOrders()
            .then(data => setOrders(data))
            .catch(err => console.error('Failed to load orders:', err))
            .finally(() => setLoading(false));
    }, [token]);

    const getImageSrc = (image: string) => {
        if (!image) return 'https://via.placeholder.com/64x64?text=📦';
        if (image.startsWith('/uploads')) return `http://localhost:5000${image}`;
        return image;
    };

    if (!user) {
        return (
            <main className="container mx-auto px-4 py-24 text-center">
                <div className="bg-white p-12 rounded-lg border border-border-color max-w-md mx-auto shadow-sm">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-xl font-bold mb-2">Please sign in</h2>
                    <p className="text-gray-500 mb-6">You need to log in to see your orders.</p>
                    <Button onClick={() => navigate('/login')}>Sign In</Button>
                </div>
            </main>
        );
    }

    if (loading) {
        return (
            <main className="container mx-auto px-4 py-20 text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading orders...</p>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">My Orders</h1>
            {orders.length === 0 ? (
                <div className="bg-white p-20 rounded-lg text-center border border-border-color shadow-sm">
                    <div className="text-6xl mb-4">📦</div>
                    <h2 className="text-xl font-bold mb-2">No orders yet</h2>
                    <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
                    <Button onClick={() => navigate('/listing')}>Shop Now</Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-border-color rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-gray-50 p-4 border-b border-border-color flex flex-wrap justify-between items-center gap-4">
                                <div className="flex gap-8 flex-wrap">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order Placed</p>
                                        <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total</p>
                                        <p className="text-sm font-medium">${order.totalAmount?.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order #</p>
                                        <p className="text-sm font-medium">{order._id.slice(-8).toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Payment</p>
                                        <p className="text-sm font-medium">{order.paymentMethod || 'N/A'}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                            order.status === 'confirmed' ? 'bg-indigo-100 text-indigo-700' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>{order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}</span>
                            </div>

                            {/* Shipping Address */}
                            {order.shippingAddress && (order.shippingAddress.fullName || order.shippingAddress.address) && (
                                <div className="px-6 pt-4 pb-2 border-b border-border-color bg-blue-50/30">
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Ship To</p>
                                    <div className="text-sm text-gray-700 space-y-0.5">
                                        {order.shippingAddress.fullName && <p className="font-medium">{order.shippingAddress.fullName}</p>}
                                        {order.shippingAddress.address && <p>{order.shippingAddress.address}</p>}
                                        <p>
                                            {[order.shippingAddress.city, order.shippingAddress.postalCode, order.shippingAddress.country]
                                                .filter(Boolean).join(', ')}
                                        </p>
                                        {order.shippingAddress.phone && <p>📞 {order.shippingAddress.phone}</p>}
                                    </div>
                                </div>
                            )}

                            <div className="p-6 space-y-4">
                                {order.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="flex gap-6 items-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center p-1 overflow-hidden">
                                            <img
                                                src={getImageSrc(item.product?.image)}
                                                alt=""
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=📦'; }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-800">{item.product?.title || 'Product'}</h3>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price?.toFixed(2)}</p>
                                            {item.product?.brand && <p className="text-xs text-gray-400">Brand: {item.product.brand}</p>}
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${(item.quantity * item.price).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default OrdersPage;
