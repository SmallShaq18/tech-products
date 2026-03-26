/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faLock,
  faUser,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import StateLgaDropdown from '../../components/StateLgaDropdown';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

/* ── tiny sub-components ─────────────────────────────────── */

const Field = ({ label, error, children }) => (
  <div className="th-field">
    <label className="th-field__label">{label}</label>
    {children}
    {error && <span className="th-field__error">{error}</span>}
  </div>
);

const Input = ({ error, ...props }) => (
  <input
    {...props}
    className={`th-input ${error ? 'th-input--error' : ''}`}
  />
);

/* ── Main component ──────────────────────────────────────── */

const CheckoutForm = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  /* ── handlers ─────────────────────────────────────────── */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const required = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zipCode'
    ];

    required.forEach(field => {
      if (!formData[field].trim()) newErrors[field] = 'Required';
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email';

    if (formData.phone && !/^\d{11}$/.test(formData.phone))
      newErrors.phone = 'Must be 11 digits';

    if (!/^\d{16}$/.test(formData.cardNumber))
      newErrors.cardNumber = 'Must be 16 digits';

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
      newErrors.expiryDate = 'Use MM/YY format';

    if (!/^\d{3,4}$/.test(formData.cvv))
      newErrors.cvv = '3 or 4 digits';

    if (!/^\d{6}$/.test(formData.zipCode))
      newErrors.zipCode = 'Must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (Math.random() < 0.2) throw new Error('Payment failed');

      if (user) {
        const order = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          items: cartItems.map(item => ({
            id: item.id,
            title: item.name,
            price: item.price,
            quantity: item.quantity,
            thumbnail: item.pic,
          })),
          total: totalAmount,
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
        };

        const existingOrders =
          JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];

        existingOrders.push(order);

        localStorage.setItem(
          `orders_${user.id}`,
          JSON.stringify(existingOrders)
        );
      }

      clearCart();

      navigate('/success', {
        state: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          state: formData.state,
        },
      });
    } catch {
      navigate('/failure');
    } finally {
      setIsProcessing(false);
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal', icon: faUser },
    { id: 'shipping', label: 'Shipping', icon: faMapMarkerAlt },
    { id: 'payment', label: 'Payment', icon: faCreditCard },
  ];

  /* ── UI ─────────────────────────────────────────────── */

  return (
    <form onSubmit={handleSubmit} className="th-checkout-form">

      {/* Steps */}
      <div className="th-steps">
        {sections.map((s, i) => (
          <React.Fragment key={s.id}>
            <button
              type="button"
              className={`th-step ${activeSection === s.id ? 'th-step--active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              <span className="th-step__num">{i + 1}</span>
              <span className="th-step__label">{s.label}</span>
            </button>
            {i < sections.length - 1 && <div className="th-step__line" />}
          </React.Fragment>
        ))}
      </div>

      {/* Personal */}
      <div className="th-form-section">
        <div className="th-form-section__header">
          <div className="th-form-section__icon-wrap">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div>
            <h3>Personal Information</h3>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-sm-6">
            <Field label="First Name *" error={errors.firstName}>
              <Input name="firstName" value={formData.firstName} onChange={handleInputChange} />
            </Field>
          </div>

          <div className="col-sm-6">
            <Field label="Last Name *" error={errors.lastName}>
              <Input name="lastName" value={formData.lastName} onChange={handleInputChange} />
            </Field>
          </div>
        </div>
      </div>

      {/* Shipping */}
      <div className="th-form-section">
        <div className="th-form-section__header">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <h3>Shipping Address</h3>
        </div>

        <Field label="Address *" error={errors.address}>
          <Input name="address" value={formData.address} onChange={handleInputChange} />
        </Field>
      </div>

      {/* Payment */}
      <div className="th-form-section">
        <div className="th-form-section__header">
          <FontAwesomeIcon icon={faCreditCard} />
          <h3>Payment</h3>
        </div>

        <Field label="Card Number *" error={errors.cardNumber}>
          <Input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
        </Field>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isProcessing}
        className="th-checkout-submit"
      >
        {isProcessing ? 'Processing…' : `Pay $${totalAmount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;