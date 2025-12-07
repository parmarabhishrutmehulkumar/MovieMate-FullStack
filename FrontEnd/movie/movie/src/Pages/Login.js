import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:4000/login', formData);
      if (response.status === 200) {
        localStorage.setItem('authtoken', response.data.token);
        localStorage.setItem('user', JSON.stringify(
          response.data.user || { 
            email: formData.email, 
            name: formData.email.split('@')[0] 
          }
        ));
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay" />
      
      <Link to="/" className="auth-logo">
        MOVIEMATE
      </Link>

      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-card">
          <h1>Sign In</h1>
          
          <form onSubmit={handleLogin} className="auth-form">
            {error && (
              <motion.div 
                className="auth-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
              >
                {error}
              </motion.div>
            )}

            <div className="form-field">
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  aria-label="Email address"
                />
              </div>
            </div>

            <div className="form-field">
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  aria-label="Password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="auth-submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="auth-footer">
              <p>
                New to MovieMate? <Link to="/">Sign up now</Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
