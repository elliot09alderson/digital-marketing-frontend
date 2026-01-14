import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from 'react-icons/fi';
import { API_URL } from '../config/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-dark-950 flex items-center justify-center px-4 py-8 overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed top-1/4 left-1/4 w-[300px] h-[300px] bg-primary-500/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[200px] h-[200px] bg-primary-600/15 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="card-water-glass p-6 sm:p-8">
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8">
            <img 
              src="/logo-2.jpeg" 
              alt="Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 border-2 border-primary-500/30"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-dark-400 text-xs sm:text-sm mt-1">Enter your credentials to continue</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 group-focus-within:text-primary-400 text-sm sm:text-base" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-xl bg-dark-800/50 border border-dark-600/50 text-white text-sm sm:text-base placeholder-dark-500 focus:outline-none focus:border-primary-500/50"
                required
              />
            </div>

            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 group-focus-within:text-primary-400 text-sm sm:text-base" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 sm:pl-12 pr-12 py-3 sm:py-3.5 rounded-xl bg-dark-800/50 border border-dark-600/50 text-white text-sm sm:text-base placeholder-dark-500 focus:outline-none focus:border-primary-500/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-primary-400 transition-colors"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 rounded-xl bg-primary-500 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60 text-sm sm:text-base"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FiLogIn />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Back to site */}
          <div className="mt-6 text-center">
            <a href="/" className="text-dark-400 text-xs sm:text-sm hover:text-primary-400">
              ← Back to Website
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
