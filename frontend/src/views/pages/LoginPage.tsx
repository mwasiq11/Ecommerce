
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/profile');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-light-gray py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-border-color overflow-hidden">
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign in</h1>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input type="email" placeholder="Email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <Link to="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</Link>
                            </div>
                            <input type="password" placeholder="Password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <Button fullWidth size="lg" type="submit" className="mt-2" disabled={loading}>
                            {loading ? 'Signing in...' : 'Log In'}
                        </Button>
                    </form>

                </div>
                <div className="p-6 bg-gray-50 border-t border-border-color text-center">
                    <p className="text-sm text-gray-600">Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register now</Link></p>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
