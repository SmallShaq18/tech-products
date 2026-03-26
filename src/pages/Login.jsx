// ── Login.jsx ────────────────────────────────────────────────
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = login(formData.email, formData.password);
    setIsLoading(false);
    if (success) navigate('/');
  };

  return (
    <div className="th-auth-page">
      <div className="th-auth-card">
        {/* Header */}
        <div className="th-auth-card__header">
          <span className="th-auth-card__logo">TechHub</span>
          <h1 className="th-auth-card__title">Welcome back</h1>
          <p className="th-auth-card__sub">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="th-auth-card__form">
          <div className="th-field">
            <label className="th-field__label" htmlFor="email">Email Address</label>
            <input
              type="email" id="email" name="email"
              className="th-input" value={formData.email}
              onChange={handleChange} placeholder="you@example.com"
              required autoComplete="email"
            />
          </div>

          <div className="th-field">
            <label className="th-field__label" htmlFor="password">Password</label>
            <input
              type="password" id="password" name="password"
              className="th-input" value={formData.password}
              onChange={handleChange} placeholder="••••••••"
              required autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="th-btn th-btn--primary th-auth-card__submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <><span className="th-btn-ui__spinner th-spinner--invert" />Signing in…</>
            ) : (
              <><FontAwesomeIcon icon={faLock} />Sign In</>
            )}
          </button>
        </form>

        <p className="th-auth-card__footer">
          Don't have an account?{' '}
          <Link to="/register" className="th-auth-card__link">
            Create one <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

