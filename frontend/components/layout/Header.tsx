
import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const [search, setSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/listing?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header className="bg-white border-b border-border-color sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Mobile Hamburger */}
        <button 
          className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-primary"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <span className="text-2xl font-bold text-primary tracking-tight">Brand</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl w-full flex border-2 border-primary rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all order-last md:order-none">
          <input 
            type="text" 
            placeholder="Search products, brands or suppliers" 
            className="flex-1 px-4 py-2 outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="bg-white px-4 py-2 border-l border-gray-200 outline-none hidden sm:block text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer">
            <option>All category</option>
            <option>Electronics</option>
            <option>Clothes</option>
            <option>Home interiors</option>
          </select>
          <button type="submit" className="bg-primary text-white px-8 py-2 font-bold hover:bg-blue-700 transition-colors active:scale-95">
            Search
          </button>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link to="/profile" className="hidden sm:flex flex-col items-center cursor-pointer group">
            <svg className="w-6 h-6 text-gray-500 group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-xs text-gray-500 mt-1 font-medium group-hover:text-primary">Profile</span>
          </Link>
          <Link to="/messages" className="hidden sm:flex flex-col items-center cursor-pointer group">
            <svg className="w-6 h-6 text-gray-500 group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            <span className="text-xs text-gray-500 mt-1 font-medium group-hover:text-primary">Message</span>
          </Link>
          <Link to="/orders" className="flex flex-col items-center cursor-pointer group">
            <svg className="w-6 h-6 text-gray-500 group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span className="text-xs text-gray-500 mt-1 font-medium group-hover:text-primary hidden sm:block">Orders</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center group relative">
            <svg className="w-6 h-6 text-gray-500 group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span className="text-xs text-gray-500 mt-1 font-medium group-hover:text-primary hidden sm:block">My cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Sub Header (Desktop) */}
      <div className="border-t border-border-color bg-white hidden lg:block">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar whitespace-nowrap">
            <Link to="/listing" className="flex items-center gap-2 font-bold text-gray-800 hover:text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              All category
            </Link>
            <Link to="/listing" className="font-medium text-gray-600 hover:text-primary">Hot offers</Link>
            <Link to="/gift-boxes" className="font-medium text-gray-600 hover:text-primary">Gift boxes</Link>
            <Link to="/projects" className="font-medium text-gray-600 hover:text-primary">Projects</Link>
            <Link to="/help" className="font-medium text-gray-600 hover:text-primary">Help</Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 font-medium text-gray-600 cursor-pointer hover:text-primary">
              English, USD <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
            <div className="flex items-center gap-1 font-medium text-gray-600 cursor-pointer hover:text-primary">
              Ship to 🇩🇪 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
