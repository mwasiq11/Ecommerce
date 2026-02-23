
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, MOCK_PRODUCTS } from '../../constants';
import Button from '../../components/ui/Button';

const HomePage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 23, min: 59, sec: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
        if (prev.min > 0) return { ...prev, min: prev.min - 1, sec: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, min: 59, sec: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 space-y-12">
      {/* 1. HERO SECTION (Ref 1) */}
      <section className="bg-white border border-border-color rounded-lg p-5 flex flex-col lg:flex-row gap-5 shadow-sm">
        <div className="lg:w-1/4 hidden lg:block">
          <ul className="space-y-1">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <button className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-primary rounded-md transition text-gray-700 font-medium">
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="lg:w-2/4 relative min-h-[400px] bg-cover bg-center rounded-lg overflow-hidden flex items-center p-12 group" 
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=600')` }}>
          <div className="bg-gradient-to-r from-blue-900/60 to-transparent absolute inset-0"></div>
          <div className="relative z-10 max-w-sm text-white">
            <h2 className="text-2xl font-normal mb-1">Latest trending</h2>
            <h1 className="text-4xl font-bold mb-6">Electronic items</h1>
            <Button variant="secondary" size="lg" className="bg-white text-gray-900 hover:bg-gray-100 border-none px-8">Source now</Button>
          </div>
        </div>

        <div className="lg:w-1/4 flex flex-col gap-3">
          <div className="bg-[#E3F0FF] p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://i.pravatar.cc/100?u=user1" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="User" />
              <p className="text-sm font-medium text-gray-800 leading-tight">Hi, user<br/>let's get started</p>
            </div>
            <Link to="/profile"><Button fullWidth size="sm" className="mb-2 shadow-sm">Join now</Button></Link>
            <Button fullWidth variant="outline" size="sm" className="bg-white hover:border-primary">Log in</Button>
          </div>
          <div className="bg-[#F38332] text-white p-5 rounded-lg flex-1 shadow-sm flex flex-col justify-center">
            <p className="text-sm font-medium opacity-90">Get US $10 off with a new supplier</p>
          </div>
          <div className="bg-[#55BDC3] text-white p-5 rounded-lg flex-1 shadow-sm flex flex-col justify-center">
            <p className="text-sm font-medium opacity-90">Send quotes with supplier preferences</p>
          </div>
        </div>
      </section>

      {/* 2. DEALS & OFFERS (Ref 2) */}
      <section className="bg-white border border-border-color rounded-lg overflow-hidden flex flex-col md:flex-row shadow-sm">
        <div className="p-8 border-r border-border-color md:w-1/5 flex flex-col justify-center bg-gray-50/30">
          <h3 className="text-xl font-bold mb-1">Deals and offers</h3>
          <p className="text-gray-400 text-sm mb-6">Hygiene equipments</p>
          <div className="flex gap-2">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hour' },
              { val: timeLeft.min, label: 'Min' },
              { val: timeLeft.sec, label: 'Sec' }
            ].map((t, idx) => (
              <div key={idx} className="bg-[#EB001B] text-white rounded-md w-12 py-2 flex flex-col items-center">
                <span className="text-lg font-bold leading-none">{String(t.val).padStart(2, '0')}</span>
                <span className="text-[10px] opacity-80 uppercase tracking-tighter">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {MOCK_PRODUCTS.slice(0, 5).map(prod => (
            <Link to={`/product/${prod.id}`} key={prod.id} className="p-6 border-r border-border-color last:border-r-0 hover:bg-gray-50 transition cursor-pointer flex flex-col items-center text-center group">
              <div className="h-32 w-full flex items-center justify-center mb-4">
                <img src={prod.image} alt={prod.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="text-sm text-gray-700 mb-1 font-medium truncate w-full">{prod.title.split(',')[0]}</p>
              <span className="bg-[#FFE3E3] text-[#EB001B] px-3 py-1 rounded-full text-xs font-bold">-25%</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. HOME AND OUTDOOR (Ref 3) */}
      <section className="bg-white border border-border-color rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-sm">
        <div className="lg:w-1/4 relative p-10 flex flex-col bg-cover bg-center text-gray-800" 
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&h=600')` }}>
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6 max-w-[150px] leading-tight">Home and outdoor</h3>
            <Button variant="secondary" className="bg-white text-gray-900 border-none shadow-md hover:bg-gray-100">Source now</Button>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4">
          {MOCK_PRODUCTS.slice(3, 11).map((prod, i) => (
            <div key={i} className="p-5 border-r border-b border-border-color flex flex-col justify-between hover:bg-gray-50 transition cursor-pointer">
              <div>
                <p className="font-medium text-sm mb-1 leading-tight">{prod.title.split(' ')[0]} {prod.title.split(' ')[1]}</p>
                <p className="text-xs text-gray-400">From USD {prod.price}</p>
              </div>
              <div className="flex justify-end mt-4">
                <img src={prod.image} alt="Item" className="w-16 h-16 object-contain" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CONSUMER ELECTRONICS (Ref 4) */}
      <section className="bg-white border border-border-color rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-sm">
        <div className="lg:w-1/4 relative p-10 flex flex-col bg-cover bg-center text-gray-800" 
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&h=600')` }}>
          <div className="absolute inset-0 bg-blue-50/40 backdrop-blur-[2px]"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6 max-w-[150px] leading-tight">Consumer electronics</h3>
            <Button variant="secondary" className="bg-white text-gray-900 border-none shadow-md hover:bg-gray-100">Source now</Button>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4">
          {MOCK_PRODUCTS.slice(0, 8).map((prod, i) => (
            <div key={i} className="p-5 border-r border-b border-border-color flex flex-col justify-between hover:bg-gray-50 transition cursor-pointer">
              <div>
                <p className="font-medium text-sm mb-1 leading-tight">{prod.title.split(' ')[0]} {prod.title.split(' ')[1]}</p>
                <p className="text-xs text-gray-400">From USD {prod.price}</p>
              </div>
              <div className="flex justify-end mt-4">
                <img src={prod.image} alt="Item" className="w-16 h-16 object-contain" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. QUOTE REQUEST (Ref 5) - Industrial Background */}
      <section className="relative rounded-lg overflow-hidden min-h-[440px] flex items-center p-8 lg:p-12 text-white shadow-xl" 
               style={{ backgroundImage: `linear-gradient(90deg, #2C7CF1 0%, rgba(0, 209, 255, 0.5) 100%), url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=600')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold mb-6 leading-tight">An easy way to send requests to all suppliers</h2>
          <p className="text-lg opacity-90 mb-8 max-w-md">Get instant quotes from thousands of global manufacturers with just one simple form.</p>
        </div>
        <div className="hidden lg:block ml-auto bg-white text-gray-800 p-8 rounded-xl shadow-2xl w-[480px]">
          <h3 className="text-xl font-bold mb-6">Send quote to suppliers</h3>
          <form className="space-y-4">
            <input type="text" placeholder="What item you need?" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
            <textarea placeholder="Type more details" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition h-24" />
            <div className="flex gap-4">
              <input type="number" placeholder="Quantity" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
              <select className="px-4 py-2.5 border border-gray-300 rounded-lg outline-none hover:bg-gray-50 cursor-pointer">
                <option>Pcs</option>
                <option>Kg</option>
                <option>Sets</option>
              </select>
            </div>
            <Button fullWidth size="lg">Send inquiry</Button>
          </form>
        </div>
      </section>

      {/* 6. RECOMMENDED ITEMS (Ref 6) */}
      <section>
        <h3 className="text-2xl font-bold mb-8 text-gray-800">Recommended items</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {MOCK_PRODUCTS.map(prod => (
            <Link to={`/product/${prod.id}`} key={prod.id} className="bg-white border border-border-color rounded-xl p-5 hover:shadow-lg hover:border-primary transition-all group block shadow-sm">
              <div className="aspect-square w-full mb-4 flex items-center justify-center bg-gray-50/50 rounded-lg overflow-hidden">
                <img src={prod.image} alt={prod.title} className="max-h-[80%] max-w-[80%] object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="font-bold text-lg mb-1 text-gray-900">${prod.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{prod.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Extra Services Section (Ref Image styling) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Source from Industry Hubs', icon: '🏭', img: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?auto=format&fit=crop&w=400&h=300' },
          { title: 'Customize Your Products', icon: '🎨', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=400&h=300' },
          { title: 'Fast, Reliable Shipping', icon: '✈️', img: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&w=400&h=300' },
          { title: 'Product Monitoring', icon: '🛡️', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&h=300' }
        ].map((service, i) => (
          <div key={i} className="bg-white border border-border-color rounded-xl overflow-hidden shadow-sm group">
            <div className="relative h-32">
              <img src={service.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-[-20px] right-6 w-12 h-12 bg-[#D1E7FF] border-4 border-white rounded-full flex items-center justify-center text-xl shadow-md">
                {service.icon}
              </div>
            </div>
            <div className="p-6 pt-8">
              <h4 className="font-bold text-gray-800 text-sm leading-snug">{service.title}</h4>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
