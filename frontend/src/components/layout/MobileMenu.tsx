
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            <div
                className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="bg-[#EFF2F4] p-5 flex flex-col gap-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                    {user ? (
                        <div className="text-[#1C1C1C] text-lg font-medium">
                            <span>{user.name}</span>
                        </div>
                    ) : (
                        <div className="text-[#1C1C1C] text-lg font-medium">
                            <Link to="/login" onClick={onClose} className="hover:text-primary transition">Sign in</Link>
                            <span className="mx-2 opacity-30">|</span>
                            <Link to="/register" onClick={onClose} className="hover:text-primary transition">Register</Link>
                        </div>
                    )}
                </div>

                <nav className="flex-1 overflow-y-auto">
                    <div className="py-2">
                        <MenuItem icon="🏠" label="Home" to="/" onClick={onClose} />
                        <MenuItem icon="📋" label="Categories" to="/listing" onClick={onClose} />
                        <MenuItem icon="❤️" label="Favorites" to="/favorites" onClick={onClose} />
                        <MenuItem icon="📦" label="My orders" to="/orders" onClick={onClose} />
                        <MenuItem icon="🛒" label="Cart" to="/cart" onClick={onClose} />
                        {user && <MenuItem icon="🏪" label="Sell Product" to="/sell" onClick={onClose} />}
                        {user && <MenuItem icon="📦" label="My Products" to="/my-products" onClick={onClose} />}
                    </div>
                    <div className="border-t border-gray-100 my-2"></div>
                    <div className="py-2">
                        <MenuItem icon="🌐" label="English | USD" to="#" onClick={onClose} />
                        <MenuItem icon="🎧" label="Contact us" to="/contact" onClick={onClose} />
                        <MenuItem icon="🏢" label="About" to="/about" onClick={onClose} />
                    </div>
                    {user && (
                        <>
                            <div className="border-t border-gray-100 my-2"></div>
                            <div className="py-2 px-6">
                                <button onClick={() => { logout(); onClose(); }} className="w-full text-left text-danger font-medium py-3 hover:bg-red-50 px-4 rounded-md transition">
                                    🚪 Log Out
                                </button>
                            </div>
                        </>
                    )}
                </nav>
            </div>
        </>
    );
};

const MenuItem: React.FC<{ icon: string; label: string; to: string; onClick: () => void }> = ({ icon, label, to, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition group"
    >
        <span className="text-xl w-6 flex justify-center text-gray-400 group-hover:text-primary">{icon}</span>
        <span className="text-[#1C1C1C] font-medium">{label}</span>
    </Link>
);

export default MobileMenu;
