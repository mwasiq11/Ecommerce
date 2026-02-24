
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartController } from '../../controllers/useCartController';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/apiService';
import Button from '../../components/ui/Button';

const CartPage: React.FC = () => {
    const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCartController();
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!user || !token) {
            navigate('/login');
            return;
        }
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    product: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
                totalAmount: cartTotal,
            };
            await apiService.createOrder(orderData);
            clearCart();
            alert('Order placed successfully!');
            navigate('/orders');
        } catch (err) {
            alert('Failed to place order. Please try again.');
        }
    };

    if (cartItems.length === 0) {
        return (
            <main className="container mx-auto px-4 py-24 text-center">
                <div className="bg-white p-12 rounded-lg border border-border-color inline-block max-w-lg w-full">
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
                    <div className="bg-white border border-border-color rounded-lg p-6">
                        {cartItems.map((item, idx) => (
                            <div key={item.product.id} className={`flex flex-col sm:flex-row gap-6 py-6 ${idx !== 0 ? 'border-t border-border-color' : ''}`}>
                                <div className="w-24 h-24 border border-border-color rounded bg-gray-50 flex items-center justify-center p-2">
                                    <img src={item.product.image} alt={item.product.title} className="max-w-full max-h-full object-contain" />
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
                </div>
                <div className="lg:w-1/4 space-y-6">
                    <div className="bg-white border border-border-color rounded-lg p-6">
                        <h4 className="text-gray-600 mb-4">Have a coupon?</h4>
                        <div className="flex border border-gray-300 rounded overflow-hidden">
                            <input type="text" placeholder="Add coupon" className="flex-1 px-4 py-2 outline-none text-sm" />
                            <button className="bg-white text-primary border-l border-gray-300 px-4 py-2 font-bold hover:bg-gray-50 transition">Apply</button>
                        </div>
                    </div>
                    <div className="bg-white border border-border-color rounded-lg p-6 shadow-sm">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600"><span>Subtotal:</span><span>${cartTotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-success"><span>Shipping:</span><span>Free</span></div>
                        </div>
                        <div className="border-t border-border-color pt-4 mb-6">
                            <div className="flex justify-between font-bold text-xl"><span>Total:</span><span>${cartTotal.toFixed(2)}</span></div>
                        </div>
                        <Button fullWidth size="lg" variant="success" onClick={handleCheckout}>
                            {user ? 'Place Order' : 'Login to Checkout'}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
