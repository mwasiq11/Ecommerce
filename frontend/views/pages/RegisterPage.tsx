
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    agreed: false
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration success
    navigate('/profile');
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-light-gray py-12 px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg border border-border-color overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Register</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="Type here" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Your e-mail</label>
              <input 
                type="email" 
                name="email"
                placeholder="example@mail.com" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                name="password"
                placeholder="At least 6 characters" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Repeat password</label>
              <input 
                type="password" 
                name="repeatPassword"
                placeholder="Type here" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button fullWidth size="lg" type="submit" className="mt-4">Register Now</Button>

            <label className="flex items-start gap-3 cursor-pointer group py-2">
              <input 
                type="checkbox" 
                name="agreed"
                className="w-4 h-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                checked={formData.agreed}
                onChange={handleInputChange}
                required
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 leading-tight">
                I agree with <Link to="/user-agreement" className="text-primary hover:underline font-medium">Terms and Conditions</Link>
              </span>
            </label>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-400 font-medium">OR</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 text-sm">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 px-4 py-2.5 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition font-medium text-sm">
              <img src="https://www.svgrepo.com/show/448224/facebook.svg" className="w-5 h-5 brightness-0 invert" alt="Facebook" />
              Facebook
            </button>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-border-color text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
