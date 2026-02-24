
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/apiService';
import Button from '../../components/ui/Button';

const AdminPage: React.FC = () => {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<'products' | 'orders'>('products');
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState({ title: '', price: '', description: '', category: '', brand: '', image: '', stock: '', condition: 'Brand new' });

    useEffect(() => {
        if (!isAdmin) return;
        Promise.all([
            apiService.getProducts(),
            apiService.getAllOrders()
        ]).then(([prods, ords]) => { setProducts(prods); setOrders(ords); }).catch(console.error).finally(() => setLoading(false));
    }, [isAdmin]);

    if (!user || !isAdmin) {
        return (
            <main className="container mx-auto px-4 py-24 text-center">
                <div className="bg-white p-12 rounded-lg border border-border-color max-w-md mx-auto">
                    <div className="text-6xl mb-4">🔐</div>
                    <h2 className="text-xl font-bold mb-2">Admin Access Required</h2>
                    <p className="text-gray-500 mb-6">Only admin users can access this page.</p>
                    <Button onClick={() => navigate('/login')}>Login as Admin</Button>
                </div>
            </main>
        );
    }

    const resetForm = () => { setForm({ title: '', price: '', description: '', category: '', brand: '', image: '', stock: '', condition: 'Brand new' }); setEditId(null); setShowForm(false); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0 };
        try {
            if (editId) {
                const updated = await apiService.updateProduct(editId, data);
                setProducts(prev => prev.map(p => p._id === editId ? updated : p));
            } else {
                const created = await apiService.createProduct(data);
                setProducts(prev => [created, ...prev]);
            }
            resetForm();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleEdit = (p: any) => {
        setForm({ title: p.title, price: String(p.price), description: p.description || '', category: p.category || '', brand: p.brand || '', image: p.image || '', stock: String(p.stock || 0), condition: p.condition || 'Brand new' });
        setEditId(p._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this product?')) return;
        try {
            await apiService.deleteProduct(id);
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch (err: any) { alert(err.message); }
    };

    if (loading) return (
        <main className="container mx-auto px-4 py-20 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </main>
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <div className="flex border border-border-color rounded overflow-hidden">
                    <button onClick={() => setTab('products')} className={`px-4 py-2 text-sm font-medium ${tab === 'products' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50'}`}>Products ({products.length})</button>
                    <button onClick={() => setTab('orders')} className={`px-4 py-2 text-sm font-medium border-l border-border-color ${tab === 'orders' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50'}`}>Orders ({orders.length})</button>
                </div>
            </div>

            {tab === 'products' && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold">Product Management</h2>
                        <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>{showForm ? 'Cancel' : '+ Add Product'}</Button>
                    </div>

                    {showForm && (
                        <form onSubmit={handleSubmit} className="bg-white p-6 border border-border-color rounded-lg shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input placeholder="Title *" className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
                            <input placeholder="Price *" type="number" step="0.01" className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required />
                            <input placeholder="Category" className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} />
                            <input placeholder="Brand" className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" value={form.brand} onChange={e => setForm(p => ({ ...p, brand: e.target.value }))} />
                            <input placeholder="Image URL" className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} />
                            <input placeholder="Stock" type="number" className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} />
                            <textarea placeholder="Description" className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary h-24" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
                            <div className="md:col-span-2 flex justify-end gap-4">
                                <Button variant="outline" type="button" onClick={resetForm}>Cancel</Button>
                                <Button type="submit">{editId ? 'Update Product' : 'Create Product'}</Button>
                            </div>
                        </form>
                    )}

                    <div className="bg-white border border-border-color rounded-lg overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-border-color">
                                    <tr><th className="px-4 py-3 text-left font-bold">Image</th><th className="px-4 py-3 text-left font-bold">Title</th><th className="px-4 py-3 text-left font-bold">Price</th><th className="px-4 py-3 text-left font-bold">Stock</th><th className="px-4 py-3 text-left font-bold">Category</th><th className="px-4 py-3 text-right font-bold">Actions</th></tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p._id} className="border-b border-border-color hover:bg-gray-50">
                                            <td className="px-4 py-3"><div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center"><img src={p.image} alt="" className="max-w-full max-h-full object-contain" /></div></td>
                                            <td className="px-4 py-3 font-medium max-w-[200px] truncate">{p.title}</td>
                                            <td className="px-4 py-3 font-bold">${p.price?.toFixed(2)}</td>
                                            <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock > 10 ? 'bg-green-100 text-green-700' : p.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{p.stock}</span></td>
                                            <td className="px-4 py-3 text-gray-500">{p.category}</td>
                                            <td className="px-4 py-3 text-right space-x-2">
                                                <button onClick={() => handleEdit(p)} className="text-primary font-bold hover:underline">Edit</button>
                                                <button onClick={() => handleDelete(p._id)} className="text-danger font-bold hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {tab === 'orders' && (
                <div className="space-y-4">
                    <h2 className="text-lg font-bold mb-4">All Orders</h2>
                    {orders.length === 0 ? (
                        <div className="bg-white p-12 rounded-lg text-center border border-border-color"><p className="text-gray-500">No orders yet.</p></div>
                    ) : orders.map(order => (
                        <div key={order._id} className="bg-white border border-border-color rounded-lg p-4 shadow-sm">
                            <div className="flex flex-wrap justify-between items-center gap-4 mb-3">
                                <div className="flex gap-6 text-sm">
                                    <div><span className="text-gray-400">Order:</span> <span className="font-bold">#{order._id.slice(-8)}</span></div>
                                    <div><span className="text-gray-400">User:</span> <span className="font-medium">{order.user?.name || order.user?.email || 'N/A'}</span></div>
                                    <div><span className="text-gray-400">Total:</span> <span className="font-bold">${order.totalAmount?.toFixed(2)}</span></div>
                                    <div><span className="text-gray-400">Date:</span> <span>{new Date(order.createdAt).toLocaleDateString()}</span></div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
                            </div>
                            <div className="text-xs text-gray-500">{order.items?.length || 0} item(s)</div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default AdminPage;
