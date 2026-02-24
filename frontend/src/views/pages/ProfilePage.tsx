
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/apiService';
import Button from '../../components/ui/Button';

const getAvatarSrc = (avatar?: string) => {
    if (!avatar) return '';
    if (avatar.startsWith('/uploads')) return `http://localhost:5000${avatar}`;
    return avatar;
};

const ProfilePage: React.FC = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || '',
    });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarBase64, setAvatarBase64] = useState<string>('');
    const [saving, setSaving] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'Image must be less than 5MB' });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            setAvatarPreview(base64);
            setAvatarBase64(base64);

            // Immediately upload the avatar
            setUploadingAvatar(true);
            setMessage(null);
            try {
                const updatedUser = await apiService.updateProfile(user._id, { avatar: base64 });
                updateUser(updatedUser);
                setAvatarPreview(null);
                setAvatarBase64('');
                setMessage({ type: 'success', text: 'Profile picture updated!' });
            } catch (err: any) {
                setMessage({ type: 'error', text: err.message || 'Failed to upload avatar' });
            } finally {
                setUploadingAvatar(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const payload: any = {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
            };
            // Include avatar if a new one was selected but not yet uploaded
            if (avatarBase64) {
                payload.avatar = avatarBase64;
            }

            const updatedUser = await apiService.updateProfile(user._id, payload);
            updateUser(updatedUser);
            setAvatarPreview(null);
            setAvatarBase64('');
            setMessage({ type: 'success', text: 'Profile saved successfully!' });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to save profile' });
        } finally {
            setSaving(false);
        }
    };

    const handleDiscard = () => {
        setFormData({
            name: user.name || '',
            phone: user.phone || '',
            address: user.address || '',
        });
        setAvatarPreview(null);
        setAvatarBase64('');
        setMessage(null);
    };

    // Determine which avatar to display
    const displayAvatar = avatarPreview || getAvatarSrc(user.avatar);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-1/4">
                    <div className="bg-white border border-border-color rounded-lg overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border-color text-center">
                            {/* Avatar with upload overlay */}
                            <div className="relative w-28 h-28 mx-auto mb-4 group">
                                <div
                                    onClick={handleAvatarClick}
                                    className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 cursor-pointer border-4 border-white shadow-lg ring-2 ring-blue-100 transition-all group-hover:ring-primary/40"
                                >
                                    {displayAvatar ? (
                                        <img
                                            src={displayAvatar}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                                        />
                                    ) : null}
                                    {!displayAvatar && (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-4xl">👤</span>
                                        </div>
                                    )}
                                </div>
                                {/* Camera overlay */}
                                <div
                                    onClick={handleAvatarClick}
                                    className="absolute inset-0 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all cursor-pointer"
                                >
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-white text-[10px] font-bold mt-0.5">Change</span>
                                    </div>
                                </div>
                                {/* Upload spinner */}
                                {uploadingAvatar && (
                                    <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50">
                                        <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                                {/* Small camera badge */}
                                <div
                                    onClick={handleAvatarClick}
                                    className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-md border-2 border-white hover:bg-blue-700 transition-colors"
                                >
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                            <h3 className="font-bold text-lg">{user.name}</h3>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                            {user.role === 'admin' && (
                                <span className="mt-2 inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">Admin</span>
                            )}
                        </div>
                        <nav className="p-2">
                            {[
                                { label: 'Profile Settings', path: '/profile' },
                                { label: 'My Orders', path: '/orders' },
                                { label: 'My Messages', path: '/messages' },
                                { label: 'My Products', path: '/my-products' },
                                { label: 'Sell Product', path: '/sell' },
                                { label: 'Wishlist', path: '/wishlist' },
                            ].map((item, idx) => (
                                <Link key={idx} to={item.path} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-md transition text-gray-700 font-medium">
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
                    {message && (
                        <div className={`px-4 py-3 rounded-lg text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'
                            }`}>
                            <span>{message.type === 'success' ? '✅' : '⚠️'}</span> {message.text}
                        </div>
                    )}
                    <div className="bg-white border border-border-color rounded-lg p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
                        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue={user.email}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-gray-50 text-gray-500 cursor-not-allowed"
                                    readOnly
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 8900"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="123 Main St, City, Country"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                />
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-4 pt-2">
                                <Button variant="outline" type="button" onClick={handleDiscard}>Discard</Button>
                                <Button type="submit" disabled={saving}>
                                    {saving ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Saving...
                                        </span>
                                    ) : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
