
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './views/pages/HomePage';
import ListingPage from './views/pages/ListingPage';
import CartPage from './views/pages/CartPage';
import ProductDetailPage from './views/pages/ProductDetailPage';
import ProfilePage from './views/pages/ProfilePage';
import OrdersPage from './views/pages/OrdersPage';
import MessagesPage from './views/pages/MessagesPage';
import HelpPage from './views/pages/HelpPage';
import ProjectsPage from './views/pages/ProjectsPage';
import GiftBoxesPage from './views/pages/GiftBoxesPage';
import LoginPage from './views/pages/LoginPage';
import RegisterPage from './views/pages/RegisterPage';
import { 
  FavoritesPage, 
  ContactPage, 
  AboutPage, 
  UserAgreementPage, 
  PartnershipPage, 
  PrivacyPolicyPage 
} from './views/pages/PlaceholderPages';
import { useCartController } from './controllers/useCartController';

const App: React.FC = () => {
  const { cartCount } = useCartController();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetch
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading MarketPlace...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header cartCount={cartCount} />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listing" element={<ListingPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/gift-boxes" element={<GiftBoxesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Mobile Menu & Footer Routes */}
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/user-agreement" element={<UserAgreementPage />} />
            <Route path="/partnership" element={<PartnershipPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
