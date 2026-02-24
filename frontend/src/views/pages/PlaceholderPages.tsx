
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const PageTemplate: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
    <main className="container mx-auto px-4 py-12">
        <div className="bg-white border border-border-color rounded-xl p-12 shadow-sm text-center">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            <div className="max-w-2xl mx-auto text-gray-600 leading-relaxed mb-8">
                {children || <p>This is a placeholder for the {title.toLowerCase()} page.</p>}
            </div>
            <Link to="/"><Button variant="primary">Return Home</Button></Link>
        </div>
    </main>
);

export const FavoritesPage = () => <PageTemplate title="Your Favorites" />;
export const ContactPage = () => <PageTemplate title="Contact Us" />;
export const AboutPage = () => <PageTemplate title="About Brand Marketplace" />;
export const UserAgreementPage = () => <PageTemplate title="User Agreement" />;
export const PartnershipPage = () => <PageTemplate title="Partnership Program" />;
export const PrivacyPolicyPage = () => <PageTemplate title="Privacy Policy" />;
