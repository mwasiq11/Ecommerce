
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartController } from '../../controllers/useCartController';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/apiService';
import Button from '../../components/ui/Button';

const CartPage: React.FC = () => {
    const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCartController();
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [showCheckout, setShowCheckout] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [shippingData, setShippingData] = useState({
        fullName: user?.name || '',
        address: user?.address || '',
        city: '',
        postalCode: '',
        country: '',
        phone: user?.phone || '',
    });
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async () => {
        if (!user || !token) {
            navigate('/login');
            return;
        }
        setShowCheckout(true);
    };

    const handlePlaceOrder = async () => {
        if (!shippingData.fullName || !shippingData.address || !shippingData.city) {
            alert('Please fill in all required shipping fields');
            return;
        }

        setOrderLoading(true);
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    product: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
                totalAmount: cartTotal,
                shippingAddress: shippingData,
                paymentMethod,
            };
            await apiService.createOrder(orderData);
            clearCart();
            alert('🎉 Order placed successfully!');
            navigate('/orders');
        } catch (err: any) {
            alert(err.message || 'Failed to place order. Please try again.');
        } finally {
            setOrderLoading(false);
        }
    };

    const getImageSrc = (image: string) => {
        if (!image) return 'https://via.placeholder.com/100x100?text=No+Image';
        if (image.startsWith('/uploads')) return `http://localhost:5000${image}`;
        return image;
    };

    if (cartItems.length === 0) {
        return (
            <main className="container mx-auto px-4 py-24 text-center">
                <div className="bg-white p-12 rounded-lg border border-border-color inline-block max-w-lg w-full shadow-sm">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🛒</div>
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Button size="lg" onClick={() => navigate('/listing')}>Shop Now</Button>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">My cart ({cartItems.length})</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-3/4 space-y-4">
                    <div className="bg-white border border-border-color rounded-lg p-6 shadow-sm">
                        {cartItems.map((item, idx) => (
                            <div key={item.product.id} className={`flex flex-col sm:flex-row gap-6 py-6 ${idx !== 0 ? 'border-t border-border-color' : ''}`}>
                                <div className="w-24 h-24 border border-border-color rounded bg-gray-50 flex items-center justify-center p-2 overflow-hidden">
                                    <img
                                        src={getImageSrc(item.product.image)}
                                        alt={item.product.title}
                                        className="max-w-full max-h-full object-contain"
                                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=No+Image'; }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-2">
                                        <h3 className="font-medium text-gray-800">{item.product.title}</h3>
                                        <p className="font-bold text-lg">${(item.product.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <div className="text-sm text-gray-400 space-y-1 mb-4">
                                        <p>Brand: {item.product.brand} | Condition: {item.product.condition}</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <Button variant="outline" size="sm" onClick={() => removeFromCart(item.product.id)} className="text-danger border-danger hover:bg-red-50">Remove</Button>
                                        <div className="flex items-center gap-2 ml-auto">
                                            <span className="text-sm text-gray-500">Qty:</span>
                                            <select value={item.quantity} onChange={e => updateQuantity(item.product.id, parseInt(e.target.value))} className="border border-gray-300 rounded px-3 py-1 text-sm bg-white">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q => <option key={q} value={q}>{q}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <Button variant="primary" onClick={() => navigate('/listing')}>← Back to shop</Button>
                        <Button variant="outline" onClick={clearCart}>Remove all</Button>
                    </div>

                    {/* Shipping Address Form */}
                    {showCheckout && (
                        <div className="bg-white border border-border-color rounded-lg p-8 shadow-sm mt-6 animate-fade-in">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span>📍</span> Shipping Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Full Name <span className="text-danger">*</span></label>
                                    <input type="text" name="fullName" value={shippingData.fullName} onChange={handleShippingChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Phone</label>
                                    <input type="tel" name="phone" value={shippingData.phone} onChange={handleShippingChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Address <span className="text-danger">*</span></label>
                                    <input type="text" name="address" value={shippingData.address} onChange={handleShippingChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">City <span className="text-danger">*</span></label>
                                    <input type="text" name="city" value={shippingData.city} onChange={handleShippingChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Postal Code</label>
                                    <input type="text" name="postalCode" value={shippingData.postalCode} onChange={handleShippingChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Country</label>
                                    <input type="text" name="country" value={shippingData.country} onChange={handleShippingChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Payment Method</label>
                                    <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-primary bg-white transition">
                                        <option>Cash on Delivery</option>
                                        <option>Bank Transfer</option>
                                        <option>Credit Card</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:w-1/4 space-y-6">
                    <div className="bg-white border border-border-color rounded-lg p-6 shadow-sm">
                        <h4 className="text-gray-600 mb-4">Have a coupon?</h4>
                        <div className="flex border border-gray-300 rounded overflow-hidden">
                            <input type="text" placeholder="Add coupon" className="flex-1 px-4 py-2 outline-none text-sm" />
                            <button className="bg-white text-primary border-l border-gray-300 px-4 py-2 font-bold hover:bg-gray-50 transition">Apply</button>
                        </div>
                    </div>
                    <div className="bg-white border border-border-color rounded-lg p-6 shadow-sm sticky top-24">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600"><span>Subtotal:</span><span>${cartTotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-success"><span>Shipping:</span><span>Free</span></div>
                        </div>
                        <div className="border-t border-border-color pt-4 mb-6">
                            <div className="flex justify-between font-bold text-xl"><span>Total:</span><span>${cartTotal.toFixed(2)}</span></div>
                        </div>
                        {showCheckout ? (
                            <Button fullWidth size="lg" variant="success" onClick={handlePlaceOrder} disabled={orderLoading}>
                                {orderLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Processing...
                                    </span>
                                ) : '✅ Confirm & Place Order'}
                            </Button>
                        ) : (
                            <Button fullWidth size="lg" variant="success" onClick={handleCheckout}>
                                {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
