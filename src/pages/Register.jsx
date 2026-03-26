import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate     = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    const success = register(formData.name, formData.email, formData.password);
    setIsLoading(false);
    if (success) navigate('/');
  };

  return (
    <div className="th-auth-page">
      <div className="th-auth-card th-auth-card--wide">
        {/* Header */}
        <div className="th-auth-card__header">
          <span className="th-auth-card__logo">TechHub</span>
          <h1 className="th-auth-card__title">Create your account</h1>
          <p className="th-auth-card__sub">Join thousands of happy customers</p>
        </div>

        <form onSubmit={handleSubmit} className="th-auth-card__form">
          <div className="row g-3">
            <div className="col-12">
              <div className="th-field">
                <label className="th-field__label" htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" className="th-input"
                  value={formData.name} onChange={handleChange}
                  placeholder="John Doe" required autoComplete="name" />
              </div>
            </div>
            <div className="col-12">
              <div className="th-field">
                <label className="th-field__label" htmlFor="reg-email">Email Address</label>
                <input type="email" id="reg-email" name="email" className="th-input"
                  value={formData.email} onChange={handleChange}
                  placeholder="you@example.com" required autoComplete="email" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="th-field">
                <label className="th-field__label" htmlFor="reg-password">Password</label>
                <input type="password" id="reg-password" name="password" className="th-input"
                  value={formData.password} onChange={handleChange}
                  placeholder="Min. 8 characters" required autoComplete="new-password" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="th-field">
                <label className="th-field__label" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password" id="confirmPassword" name="confirmPassword"
                  className={`th-input ${passwordError ? 'th-input--error' : ''}`}
                  value={formData.confirmPassword} onChange={handleChange}
                  placeholder="Repeat password" required autoComplete="new-password"
                />
                {passwordError && <span className="th-field__error">{passwordError}</span>}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="th-btn th-btn--primary th-auth-card__submit"
            disabled={isLoading}
            style={{ marginTop: 8 }}
          >
            {isLoading ? (
              <><span className="th-btn-ui__spinner th-spinner--invert" />Creating account…</>
            ) : (
              <><FontAwesomeIcon icon={faUserPlus} />Create Account</>
            )}
          </button>
        </form>

        <p className="th-auth-card__footer">
          Already have an account?{' '}
          <Link to="/login" className="th-auth-card__link">
            <FontAwesomeIcon icon={faArrowLeft} /> Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

