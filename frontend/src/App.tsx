
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
import AdminPage from './views/pages/AdminPage';
import {
    FavoritesPage, ContactPage, AboutPage,
    UserAgreementPage, PartnershipPage, PrivacyPolicyPage
} from './views/pages/PlaceholderPages';
import { useCartController } from './controllers/useCartController';

const AppContent: React.FC = () => {
    const { cartCount } = useCartController();

    return (
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
                    <Route path="/admin" element={<AdminPage />} />
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
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <HashRouter>
                <AppContent />
            </HashRouter>
        </AuthProvider>
    );
};

export default App;
