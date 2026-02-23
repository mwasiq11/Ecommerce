
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const ProfilePage: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/4">
          <div className="bg-white border border-border-color rounded-lg overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border-color text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">👤</div>
              <h3 className="font-bold text-lg">Alex Marshall</h3>
              <p className="text-gray-500 text-sm">alex.m@example.com</p>
            </div>
            <nav className="p-2">
              {[
                { label: 'Profile Settings', icon: '⚙️', path: '/profile' },
                { label: 'My Orders', icon: '📦', path: '/orders' },
                { label: 'My Messages', icon: '💬', path: '/messages' },
                { label: 'Wishlist', icon: '❤️', path: '/wishlist' },
                { label: 'Addresses', icon: '📍', path: '#' },
                { label: 'Security', icon: '🔒', path: '#' }
              ].map((item, idx) => (
                <Link key={idx} to={item.path} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-md transition text-gray-700 font-medium">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="border-t border-border-color my-2"></div>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-danger rounded-md transition font-medium text-left">
                <span>🚪</span>
                <span>Log Out</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:w-3/4 space-y-6">
          <div className="bg-white border border-border-color rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input type="text" defaultValue="Alex" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-primary" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" defaultValue="Marshall" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-primary" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" defaultValue="alex.m@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-primary" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" defaultValue="+1 234 567 890" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-primary" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-primary" defaultValue="Professional software developer and gadget enthusiast." />
              </div>
              <div className="md:col-span-2 flex justify-end gap-4">
                <Button variant="outline">Discard</Button>
                <Button>Save Changes</Button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-border-color rounded-lg p-6 shadow-sm">
              <h4 className="font-bold mb-4">Saved Payment Methods</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border-color rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] text-white font-bold">VISA</div>
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/26</p>
                    </div>
                  </div>
                  <button className="text-primary text-xs font-bold">Edit</button>
                </div>
                <Button variant="outline" size="sm" fullWidth>Add New Card</Button>
              </div>
            </div>
            <div className="bg-white border border-border-color rounded-lg p-6 shadow-sm">
              <h4 className="font-bold mb-4">Default Address</h4>
              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p className="font-medium text-gray-900">Primary Residence</p>
                <p>123 Marketplace Avenue</p>
                <p>Silicon Valley, CA 94000</p>
                <p>United States</p>
              </div>
              <Button variant="outline" size="sm" fullWidth>Manage Addresses</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
