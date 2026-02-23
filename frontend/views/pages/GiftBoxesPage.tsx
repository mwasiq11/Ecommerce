
import React from 'react';
import { MOCK_PRODUCTS } from '../../constants';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const GiftBoxesPage: React.FC = () => {
  const bundles = [
    { title: 'Tech Starter Pack', price: 1299.99, items: 3, image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&h=400', theme: 'bg-blue-600' },
    { title: 'Home Office Deluxe', price: 450.00, items: 5, image: 'https://images.unsplash.com/photo-1593642702749-b7d2a5482bb6?auto=format&fit=crop&w=400&h=400', theme: 'bg-indigo-600' },
    { title: 'Photography Pro Kit', price: 1800.00, items: 4, image: 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=400&h=400', theme: 'bg-gray-800' },
    { title: 'Gamer Elite Bundle', price: 899.00, items: 6, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&h=400', theme: 'bg-red-600' }
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-[#0D6EFD] to-[#0052cc] rounded-3xl p-12 mb-16 text-white overflow-hidden relative shadow-2xl"
           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&h=600&q=80')`, backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}>
        <div className="relative z-10 max-w-xl">
          <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block tracking-widest border border-white/30">Limited Edition</span>
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">Curated Gift Boxes</h1>
          <p className="text-xl opacity-90 mb-8 font-light">The perfect selection for corporate gifting or personal celebrations. Verified suppliers, guaranteed quality.</p>
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100 px-10 rounded-full font-bold">Explore Collection</Button>
        </div>
        <div className="absolute right-[-10%] top-[-20%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]"></div>
      </div>

      <h2 className="text-3xl font-bold mb-10 text-gray-800 flex items-center gap-3">
        <span className="w-2 h-8 bg-primary rounded-full"></span>
        Featured Bundles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {bundles.map((bundle, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-border-color shadow-sm hover:shadow-2xl transition-all duration-500 group">
            <div className={`h-56 flex items-center justify-center p-8 relative overflow-hidden`}>
              <div className={`absolute inset-0 opacity-10 ${bundle.theme}`}></div>
              <img src={bundle.image} alt={bundle.title} className="max-w-full max-h-full object-contain rounded-xl shadow-xl group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-8">
              <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">{bundle.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{bundle.items} Premium Products</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">${bundle.price}</span>
                <Button size="sm" className="rounded-full px-6">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section>
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Build Your Own Box</h2>
          <Link to="/listing" className="text-primary font-bold hover:underline mb-2">View all products →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {MOCK_PRODUCTS.slice(0, 10).map(prod => (
            <div key={prod.id} className="bg-white border border-border-color rounded-2xl p-6 flex flex-col items-center text-center hover:border-primary hover:shadow-lg transition-all group">
              <div className="w-32 h-32 flex items-center justify-center mb-6 bg-gray-50 rounded-xl overflow-hidden">
                <img src={prod.image} className="max-w-[70%] max-h-[70%] object-contain group-hover:scale-110 transition-transform duration-500" alt="" />
              </div>
              <h4 className="text-sm font-bold text-gray-800 line-clamp-1 mb-2">{prod.title}</h4>
              <p className="font-extrabold text-primary mb-4 text-lg">${prod.price}</p>
              <button className="text-xs font-bold border-2 border-gray-100 px-6 py-2 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                + Add to Box
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default GiftBoxesPage;
