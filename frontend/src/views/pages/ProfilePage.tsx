
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <main className="container mx-auto px-4 py-24 text-center">
                <div className="bg-white p-12 rounded-lg border border-border-color max-w-md mx-auto">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-xl font-bold mb-2">Please sign in</h2>
                    <p className="text-gray-500 mb-6">You need to log in to view your profile.</p>
                    <Button onClick={() => navigate('/login')}>Sign In</Button>
                </div>
            </main>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-1/4">
                    <div className="bg-white border border-border-color rounded-lg overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border-color text-center">
                            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden bg-blue-100">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl">👤</span>
                                )}
                            </div>
                            <h3 className="font-bold text-lg">{user.name}</h3>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                            {user.role === 'admin' && (
                                <span className="mt-2 inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">Admin</span>
                            )}
                        </div>
                        <nav className="p-2">
                            {[
                                { label: 'Profile Settings', icon: '⚙️', path: '/profile' },
                                { label: 'My Orders', icon: '📦', path: '/orders' },
                                { label: 'My Messages', icon: '💬', path: '/messages' },
                                { label: 'Wishlist', icon: '❤️', path: '/wishlist' },
                            ].map((item, idx) => (
                                <Link key={idx} to={item.path} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-md transition text-gray-700 font-medium">
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                            <div className="border-t border-border-color my-2"></div>
                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-danger rounded-md transition font-medium text-left">
                                <span>🚪</span><span>Log Out</span>
                            </button>
                        </nav>
                    </div>
                </aside>
                <div className="lg:w-3/4 space-y-6">
                    <div className="bg-white border border-border-color rounded-lg p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" defaultValue={user.name} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-primary" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" defaultValue={user.email} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-primary" readOnly />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" defaultValue={user.phone || ''} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-primary" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Address</label>
                                <input type="text" defaultValue={user.address || ''} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-primary" />
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-4">
                                <Button variant="outline">Discard</Button>
                                <Button>Save Changes</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
