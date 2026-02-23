
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success
    navigate('/profile');
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-light-gray py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-border-color overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign in</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Username or email</label>
              <input 
                type="text" 
                placeholder="Email or phone" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Link to="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                placeholder="Type here" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer group py-2">
              <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">Remember me</span>
            </label>

            <Button fullWidth size="lg" type="submit" className="mt-2">Log In</Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-400 font-medium">OR</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition font-medium">
              <img src="https://www.svgrepo.com/show/448224/facebook.svg" className="w-5 h-5 brightness-0 invert" alt="Facebook" />
              Continue with Facebook
            </button>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-border-color text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register now</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
