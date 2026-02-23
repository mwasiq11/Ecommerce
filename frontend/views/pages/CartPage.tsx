
import React from 'react';
import { useCartController } from '../../controllers/useCartController';
import Button from '../../components/ui/Button';

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCartController();

  if (cartItems.length === 0) {
    return (
      <main className="container mx-auto px-4 py-24 text-center">
        <div className="bg-white p-12 rounded-lg border border-border-color inline-block max-w-lg w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button size="lg" onClick={() => window.location.hash = '/listing'}>Shop Now</Button>
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
                    <p>Size: medium, Color: blue, Material: Plastic</p>
                    <p>Seller: Artel Market</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => removeFromCart(item.product.id)} className="text-danger border-danger hover:bg-red-50">Remove</Button>
                      <Button variant="outline" size="sm" className="text-primary border-primary">Save for later</Button>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-sm text-gray-500">Qty:</span>
                      <select 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                        className="border border-gray-300 rounded px-3 py-1 text-sm bg-white"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button variant="primary" onClick={() => window.location.hash = '/listing'}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back to shop
            </Button>
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
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-danger">
                <span>Discount:</span>
                <span>- $60.00</span>
              </div>
              <div className="flex justify-between text-success">
                <span>Tax:</span>
                <span>+ $14.00</span>
              </div>
            </div>
            <div className="border-t border-border-color pt-4 mb-6">
              <div className="flex justify-between font-bold text-xl">
                <span>Total:</span>
                <span>${(cartTotal - 60 + 14).toFixed(2)}</span>
              </div>
            </div>
            <Button fullWidth size="lg" variant="success" className="mb-4">Checkout</Button>
            <div className="flex justify-center gap-3">
              <div className="w-10 h-6 bg-gray-100 rounded"></div>
              <div className="w-10 h-6 bg-gray-100 rounded"></div>
              <div className="w-10 h-6 bg-gray-100 rounded"></div>
              <div className="w-10 h-6 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
