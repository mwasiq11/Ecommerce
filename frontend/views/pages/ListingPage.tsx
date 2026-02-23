
import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MOCK_PRODUCTS, CATEGORIES } from '../../constants';
import Button from '../../components/ui/Button';

const ListingPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = useMemo(() => {
    if (!query) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query)
    );
  }, [query]);

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary">Home</Link> <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span>Clothes</span> <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span>Men's wear</span> <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span className="font-medium text-gray-800">Summer clothing</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4 space-y-6">
          <div className="border-t border-border-color pt-4">
            <h4 className="font-bold flex justify-between items-center mb-4 text-gray-800">Category <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" strokeWidth="2"/></svg></h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="cursor-pointer hover:text-primary">Mobile accessory</li>
              <li className="cursor-pointer hover:text-primary">Electronics</li>
              <li className="cursor-pointer hover:text-primary">Smartphones</li>
              <li className="cursor-pointer hover:text-primary">Modern tech</li>
              <li className="text-primary cursor-pointer hover:underline">See all</li>
            </ul>
          </div>

          <div className="border-t border-border-color pt-4">
            <h4 className="font-bold flex justify-between items-center mb-4 text-gray-800">Brands <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" strokeWidth="2"/></svg></h4>
            <div className="space-y-3">
              {['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'].map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 border-gray-300 rounded text-primary focus:ring-primary" />
                  <span className="text-gray-600 text-sm group-hover:text-gray-900">{brand}</span>
                </label>
              ))}
              <p className="text-primary text-sm cursor-pointer hover:underline">See all</p>
            </div>
          </div>

          <div className="border-t border-border-color pt-4">
            <h4 className="font-bold flex justify-between items-center mb-4 text-gray-800">Price range <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" strokeWidth="2"/></svg></h4>
            <div className="space-y-4">
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div className="absolute left-[10%] right-[30%] top-0 bottom-0 bg-primary/40"></div>
                <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow cursor-pointer"></div>
                <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow cursor-pointer"></div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Min</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm outline-none focus:border-primary" />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Max</label>
                  <input type="number" placeholder="999999" className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm outline-none focus:border-primary" />
                </div>
              </div>
              <Button fullWidth variant="outline" size="sm">Apply</Button>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          <div className="bg-white border border-border-color rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <p className="text-gray-700 text-sm">{filteredProducts.length} items {query ? `found for "${query}"` : 'available'}</p>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-primary border-gray-300 rounded" />
                Verified only
              </label>
              <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none bg-white">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Newest</option>
              </select>
              <div className="flex border border-gray-300 rounded overflow-hidden">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-primary' : 'bg-white text-gray-400'} hover:bg-gray-50`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 border-l border-gray-300 ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'bg-white text-gray-400'} hover:bg-gray-50`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 10h16M4 16h16M4 22h16M4 4h16" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white p-20 rounded-lg text-center border border-border-color shadow-sm">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-bold mb-2">No products found</h2>
              <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
              <Button className="mt-6" variant="outline" onClick={() => window.history.back()}>Go Back</Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map(prod => (
                <div key={prod.id} className={`bg-white border border-border-color rounded-lg overflow-hidden flex shadow-sm hover:shadow-md transition-shadow ${viewMode === 'grid' ? 'flex-col' : 'flex-row'}`}>
                  <Link to={`/product/${prod.id}`} className={`${viewMode === 'grid' ? 'w-full aspect-square' : 'w-1/3 min-w-[200px] p-6'} flex items-center justify-center bg-gray-50/50 group`}>
                    <img src={prod.image} alt={prod.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                  </Link>
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${prod.id}`} className="font-medium text-gray-800 hover:text-primary cursor-pointer leading-snug line-clamp-2">{prod.title}</Link>
                      <button className="text-gray-300 hover:text-danger ml-2 transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth="2" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl font-bold text-gray-900">${prod.price.toFixed(2)}</span>
                      {prod.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">${prod.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <div className="flex text-warning">
                        {Array.from({length: 5}).map((_, i) => (
                          <span key={i} className={i < Math.floor(prod.rating) ? "text-warning" : "text-gray-200"}>★</span>
                        ))}
                        <span className="ml-1 text-warning font-bold">{prod.rating}</span>
                      </div>
                      <span>• {prod.orders} orders</span>
                      <span className="text-success font-bold">• {prod.shipping}</span>
                    </div>
                    {viewMode === 'list' && (
                      <p className="text-gray-500 text-sm mb-6 line-clamp-3">{prod.description}</p>
                    )}
                    <div className="mt-auto">
                      <Link to={`/product/${prod.id}`} className="text-primary font-bold text-sm hover:underline">View details</Link>
                    </div>
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
