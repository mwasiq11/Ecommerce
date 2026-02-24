
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', repeatPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.repeatPassword) { setError('Passwords do not match'); return; }
        if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return; }
        setLoading(true);
        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/profile');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-light-gray py-12 px-4">
            <div className="max-w-lg w-full bg-white rounded-xl shadow-lg border border-border-color overflow-hidden">
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Account</h1>
                    {error && (<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>)}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" placeholder="Your full name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input type="email" placeholder="example@mail.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <input type="password" placeholder="At least 6 characters" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" value={formData.password} onChange={e => setFormData(p => ({ ...p, password: e.target.value }))} required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                            <input type="password" placeholder="Repeat password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" value={formData.repeatPassword} onChange={e => setFormData(p => ({ ...p, repeatPassword: e.target.value }))} required />
                        </div>
                        <Button fullWidth size="lg" type="submit" disabled={loading}>
                            {loading ? 'Creating account...' : 'Register Now'}
                        </Button>
                    </form>
                </div>
                <div className="p-6 bg-gray-50 border-t border-border-color text-center">
                    <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link></p>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;
