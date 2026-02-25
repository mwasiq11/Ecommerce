
import React from 'react';
import { REGIONS } from '../../constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-border-color pt-12">
            <div className="container mx-auto px-4 mb-12">
                <h3 className="text-xl font-bold mb-6">Suppliers by region</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {REGIONS.map((region, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <span className="text-2xl">{region.flag}</span>
                            <div>
                                <p className="text-sm font-medium">{region.name}</p>
                                <p className="text-xs text-gray-500">{region.site}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-[#EFF2F4] py-12">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h2 className="text-2xl font-bold mb-2">Subscribe on our newsletter</h2>
                    <p className="text-gray-600 mb-6">Get daily news on upcoming offers from many suppliers all over the world</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 relative">
                            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary" />
                        </div>
                        <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </div>
                        <span className="text-2xl font-bold text-primary tracking-tight ">Marketplace Pro</span>
                    </div>
                    <p className="text-gray-600 mb-6 max-w-xs">Best information about the company goes here but now lorem ipsum is</p>
                    <div className="flex gap-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <a key={i} href="#" className="w-8 h-8 rounded-full bg-gray-400 hover:bg-primary transition flex items-center justify-center text-white">
                                <div className="w-4 h-4 bg-white/20 rounded-sm" />
                            </a>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-4">About</h4>
                    <ul className="space-y-2 text-gray-500 text-sm">
                        <li><a href="#" className="hover:text-primary">About Us</a></li>
                        <li><a href="#" className="hover:text-primary">Find store</a></li>
                        <li><a href="#" className="hover:text-primary">Categories</a></li>
                        <li><a href="#" className="hover:text-primary">Blogs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Partnership</h4>
                    <ul className="space-y-2 text-gray-500 text-sm">
                        <li><a href="#" className="hover:text-primary">About Us</a></li>
                        <li><a href="#" className="hover:text-primary">Find store</a></li>
                        <li><a href="#" className="hover:text-primary">Categories</a></li>
                        <li><a href="#" className="hover:text-primary">Blogs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Information</h4>
                    <ul className="space-y-2 text-gray-500 text-sm">
                        <li><a href="#" className="hover:text-primary">Help Center</a></li>
                        <li><a href="#" className="hover:text-primary">Money Refund</a></li>
                        <li><a href="#" className="hover:text-primary">Shipping</a></li>
                        <li><a href="#" className="hover:text-primary">Contact us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">For users</h4>
                    <ul className="space-y-2 text-gray-500 text-sm">
                        <li><a href="#" className="hover:text-primary">Login</a></li>
                        <li><a href="#" className="hover:text-primary">Register</a></li>
                        <li><a href="#" className="hover:text-primary">Settings</a></li>
                        <li><a href="#" className="hover:text-primary">My Orders</a></li>
                    </ul>
                </div>
            </div>
            <div className="bg-[#EFF2F4] py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                    <p>© 2024 Ecommerce.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="flex items-center gap-1">English <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
