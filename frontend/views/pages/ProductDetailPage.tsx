
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../constants';
import { useCartController } from '../../controllers/useCartController';
import Button from '../../components/ui/Button';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];
  const { addToCart } = useCartController();
  const [activeTab, setActiveTab] = useState('Description');
  const [quantity, setQuantity] = useState(1);

  // Use standard high-quality images for gallery
  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1526170315870-ef68971ef02f?auto=format&fit=crop&w=500&h=500&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&h=500&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&h=500&q=80',
    'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=500&h=500&q=80'
  ];

  const [mainImage, setMainImage] = useState(product.image);

  const mockReviews = [
    { name: 'James Wilson', text: 'Absolutely fantastic product. Exceeded my expectations in every way possible. The build quality is superb and the delivery was ahead of schedule!', date: 'March 12, 2024' },
    { name: 'Sarah Lancaster', text: 'Very impressed with the performance. I use it daily for my professional work and it has not disappointed yet. Highly recommended.', date: 'March 14, 2024' },
    { name: 'Michael K.', text: 'Good value for money. The design is sleek and the features are exactly what I needed. Customer support was also very helpful.', date: 'March 15, 2024' }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2"/></svg>
        <Link to="/listing" className="hover:text-primary">{product.category}</Link>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2"/></svg>
        <span className="text-gray-800 font-medium truncate">{product.title}</span>
      </div>

      <div className="bg-white border border-border-color rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-sm">
        {/* Gallery */}
        <div className="lg:w-1/2 p-8 border-r border-border-color">
          <div className="aspect-square bg-gray-50 rounded-lg border border-border-color flex items-center justify-center p-12 mb-6 group cursor-zoom-in">
            <img src={mainImage} alt={product.title} className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-105" />
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar">
            {galleryImages.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 rounded border-2 cursor-pointer hover:border-primary transition p-2 flex-shrink-0 bg-white ${mainImage === img ? 'border-primary' : 'border-border-color'}`}
              >
                <img src={img} alt="" className="w-full h-full object-contain opacity-80 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-success font-bold text-sm">✓ In Stock</p>
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex text-warning">
                {Array.from({length: 5}).map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? "text-warning" : "text-gray-200"}>★</span>
                ))}
                <span className="ml-1 text-warning font-bold">{product.rating}</span>
              </div>
              <span>• {product.orders} reviews</span>
              <span>• {product.orders * 2} sold</span>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-warning flex justify-between items-center">
            <div>
              <p className="text-3xl font-extrabold text-danger">${product.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">Free shipping over $500</p>
            </div>
            <div className="border-l border-orange-200 pl-6">
              <p className="text-gray-600 font-bold">Bulk Purchase</p>
              <p className="text-xs text-gray-400">Save 10% on 10+ items</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-3 text-sm py-2 border-b border-gray-100">
              <span className="text-gray-400">Category:</span>
              <span className="col-span-2 text-gray-700 font-medium">{product.category}</span>
            </div>
            <div className="grid grid-cols-3 text-sm py-2 border-b border-gray-100">
              <span className="text-gray-400">Material:</span>
              <span className="col-span-2 text-gray-700 font-medium">Premium Grade</span>
            </div>
            <div className="grid grid-cols-3 text-sm py-2 border-b border-gray-100">
              <span className="text-gray-400">Brand:</span>
              <span className="col-span-2 text-gray-700 font-medium">{product.brand}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden h-12">
              <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="px-5 py-2 hover:bg-gray-100 transition font-bold">-</button>
              <input type="number" value={quantity} readOnly className="w-12 text-center outline-none font-bold" />
              <button onClick={() => setQuantity(q => q+1)} className="px-5 py-2 hover:bg-gray-100 transition font-bold">+</button>
            </div>
            <Button size="lg" className="flex-1 h-12 text-lg rounded-lg shadow-lg shadow-primary/20" onClick={() => addToCart(product)}>Add to Cart</Button>
            <Button variant="outline" size="lg" className="h-12 w-12 rounded-lg text-primary border-primary flex items-center justify-center p-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth="2"/></svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 bg-white border border-border-color rounded-lg overflow-hidden shadow-sm">
        <div className="flex border-b border-border-color bg-gray-50/50 overflow-x-auto hide-scrollbar">
          {['Description', 'Reviews', 'Shipping', 'About seller'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-bold text-sm transition-colors whitespace-nowrap ${
                activeTab === tab ? 'text-primary border-b-2 border-primary bg-white' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-8">
          {activeTab === 'Description' && (
            <div className="space-y-6 max-w-4xl">
              <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                  <h4 className="font-bold mb-6 text-gray-800">Key Features</h4>
                  <ul className="space-y-4 text-sm text-gray-600">
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">✓</span>
                      Advanced optical stabilization
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">✓</span>
                      Weather-sealed body construction
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">✓</span>
                      4K 60fps video recording support
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">✓</span>
                      Dual SD card slots for redundancy
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                  <h4 className="font-bold mb-6 text-gray-800">In the box</h4>
                  <ul className="space-y-4 text-sm text-gray-600">
                    <li className="flex items-center gap-3"><span className="text-primary">•</span> Main device body</li>
                    <li className="flex items-center gap-3"><span className="text-primary">•</span> Rechargeable Li-ion battery</li>
                    <li className="flex items-center gap-3"><span className="text-primary">•</span> Battery charger</li>
                    <li className="flex items-center gap-3"><span className="text-primary">•</span> Shoulder strap & manuals</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Reviews' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-12 items-center border-b border-border-color pb-12">
                <div className="text-center">
                  <p className="text-6xl font-extrabold text-gray-800 mb-2">{product.rating}</p>
                  <div className="flex text-warning text-2xl mb-2">★★★★☆</div>
                  <p className="text-sm text-gray-400 font-medium">Global Customer Rating</p>
                </div>
                <div className="flex-1 space-y-3 w-full max-w-md">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center gap-4">
                      <span className="text-xs text-gray-500 w-12 font-bold">{stars} stars</span>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-warning" style={{ width: `${stars >= 4 ? 80 : 20}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-400 w-8">{(stars >= 4 ? 80 : 20)}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                {mockReviews.map((review, i) => (
                  <div key={i} className="flex gap-6 border-b border-gray-50 pb-8 last:border-0">
                    <img src={`https://i.pravatar.cc/150?u=${review.name}`} className="w-12 h-12 rounded-full border-2 border-gray-100" alt="" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-bold text-gray-800">{review.name}</h5>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex text-warning text-xs mb-3">★★★★★</div>
                      <p className="text-gray-600 leading-relaxed">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
