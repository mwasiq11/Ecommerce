
import React from 'react';
import { MOCK_ORDERS } from '../../constants';
import Button from '../../components/ui/Button';

const OrdersPage: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="flex border border-border-color rounded overflow-hidden">
          <button className="px-4 py-2 bg-white text-sm font-medium border-r border-border-color hover:bg-gray-50">All</button>
          <button className="px-4 py-2 bg-gray-50 text-sm font-medium border-r border-border-color">Pending</button>
          <button className="px-4 py-2 bg-white text-sm font-medium hover:bg-gray-50">Cancelled</button>
        </div>
      </div>

      <div className="space-y-6">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="bg-white border border-border-color rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-50 p-4 border-b border-border-color flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order Placed</p>
                  <p className="text-sm font-medium">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total</p>
                  <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order #</p>
                  <p className="text-sm font-medium">{order.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {order.status}
                </span>
                <button className="text-primary text-sm font-bold hover:underline">View invoice</button>
              </div>
            </div>
            <div className="p-6">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="w-20 h-20 bg-gray-100 rounded border border-border-color flex items-center justify-center p-2">
                    <img src={item.product.image} alt={item.product.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">{item.product.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-1">{item.product.description}</p>
                    <div className="flex gap-4">
                      <Button size="sm">Track package</Button>
                      <Button variant="outline" size="sm">Buy it again</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default OrdersPage;
