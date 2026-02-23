
import React, { useState } from 'react';
import Button from '../../components/ui/Button';

const HelpPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    { q: 'How do I track my order?', a: 'You can track your order in the "My Orders" section of your profile. Each order has a unique tracking number provided once shipped.' },
    { q: 'What is your refund policy?', a: 'We offer a 30-day money-back guarantee for most items. Items must be in their original packaging and unused.' },
    { q: 'How can I become a supplier?', a: 'Click on the "Partnership" link in the footer to fill out our supplier registration form.' },
    { q: 'Do you offer international shipping?', a: 'Yes, we ship to over 50 countries. Shipping rates and delivery times vary by region.' }
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
        <p className="text-gray-500 mb-8">Search for topics or browse our frequently asked questions</p>
        <div className="max-w-2xl mx-auto relative">
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <input 
            type="text" 
            placeholder="Search help topics..." 
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 shadow-sm outline-none focus:border-primary text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl border border-border-color shadow-sm text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">📦</div>
          <h3 className="font-bold text-lg mb-2">Orders & Returns</h3>
          <p className="text-gray-500 text-sm mb-4">Manage your purchases, track deliveries and start returns.</p>
          <Button variant="outline" size="sm">Browse topics</Button>
        </div>
        <div className="bg-white p-8 rounded-xl border border-border-color shadow-sm text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">💳</div>
          <h3 className="font-bold text-lg mb-2">Payments & Billing</h3>
          <p className="text-gray-500 text-sm mb-4">Update your payment methods and download your invoices.</p>
          <Button variant="outline" size="sm">Browse topics</Button>
        </div>
        <div className="bg-white p-8 rounded-xl border border-border-color shadow-sm text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🛡️</div>
          <h3 className="font-bold text-lg mb-2">Account & Safety</h3>
          <p className="text-gray-500 text-sm mb-4">Secure your account and manage your privacy settings.</p>
          <Button variant="outline" size="sm">Browse topics</Button>
        </div>
      </div>

      <section className="bg-white rounded-xl border border-border-color p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-primary">?</span> {faq.q}
              </h4>
              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 bg-primary text-white p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Still need help?</h2>
          <p className="opacity-80">Our support team is available 24/7 to assist you with any questions.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100 border-none">Chat with us</Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">Contact Support</Button>
        </div>
      </section>
    </main>
  );
};

export default HelpPage;
