import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faLock, faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
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
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zipCode: '',
    cardNumber: '', expiryDate: '', cvv: '',
  });

  const [errors, setErrors]           = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSection, setActiveSection] = useState('personal'); // 'personal' | 'shipping' | 'payment'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    required.forEach(f => { if (!formData[f].trim()) newErrors[f] = 'Required'; });

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
            id: item.id, title: item.title, price: item.price,
            quantity: item.quantity, thumbnail: item.thumbnail,
          })),
          total: totalAmount,
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
        };
        const existing = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
        existing.push(order);
        localStorage.setItem(`orders_${user.id}`, JSON.stringify(existing));
      }

      clearCart();
      navigate('/success', {
        state: {
          firstName: formData.firstName, lastName: formData.lastName,
          address: formData.address, state: formData.state,
        },
      });
    } catch (_err) {
      navigate('/failure');
    } finally {
      setIsProcessing(false);
    }
  };

  /* ── section configs for the step indicator ── */
  const sections = [
    { id: 'personal', label: 'Personal',  icon: faUser },
    { id: 'shipping', label: 'Shipping',  icon: faMapMarkerAlt },
    { id: 'payment',  label: 'Payment',   icon: faCreditCard },
  ];

  return (
    <form onSubmit={handleSubmit} className="th-checkout-form">

      {/* ── Step indicator ───────────────────────────── */}
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

      {/* ── Personal Information ─────────────────────── */}
      <div className="th-form-section">
        <div className="th-form-section__header">
          <div className="th-form-section__icon-wrap">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div>
            <h3 className="th-form-section__title">Personal Information</h3>
            <p className="th-form-section__sub">Who should we address this order to?</p>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-sm-6">
            <Field label="First Name *" error={errors.firstName}>
              <Input name="firstName" type="text" value={formData.firstName}
                onChange={handleInputChange} placeholder="John" error={errors.firstName} />
            </Field>
          </div>
          <div className="col-sm-6">
            <Field label="Last Name *" error={errors.lastName}>
              <Input name="lastName" type="text" value={formData.lastName}
                onChange={handleInputChange} placeholder="Doe" error={errors.lastName} />
            </Field>
          </div>
          <div className="col-sm-6">
            <Field label="Email Address *" error={errors.email}>
              <Input name="email" type="email" value={formData.email}
                onChange={handleInputChange} placeholder="john@example.com" error={errors.email} />
            </Field>
          </div>
          <div className="col-sm-6">
            <Field label="Phone Number *" error={errors.phone}>
              <Input name="phone" type="tel" value={formData.phone}
                onChange={handleInputChange} placeholder="08012345678" error={errors.phone} />
            </Field>
          </div>
        </div>
      </div>

      {/* ── Shipping Address ─────────────────────────── */}
      <div className="th-form-section">
        <div className="th-form-section__header">
          <div className="th-form-section__icon-wrap">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <div>
            <h3 className="th-form-section__title">Shipping Address</h3>
            <p className="th-form-section__sub">Where should we deliver your order?</p>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12">
            <Field label="Street Address *" error={errors.address}>
              <Input name="address" type="text" value={formData.address}
                onChange={handleInputChange} placeholder="14 Adeola Odeku Street"
                error={errors.address} />
            </Field>
          </div>
          <div className="col-sm-4">
            <Field label="City *" error={errors.city}>
              <Input name="city" type="text" value={formData.city}
                onChange={handleInputChange} placeholder="Lagos" error={errors.city} />
            </Field>
          </div>
          <div className="col-sm-4">
            <Field label="State *" error={errors.state}>
              <StateLgaDropdown
                selectedState={formData.state}
                onStateChange={(state) => setFormData(prev => ({ ...prev, state }))}
              />
              {errors.state && <span className="th-field__error">{errors.state}</span>}
            </Field>
          </div>
          <div className="col-sm-4">
            <Field label="ZIP / Postal Code *" error={errors.zipCode}>
              <Input name="zipCode" type="text" value={formData.zipCode}
                onChange={handleInputChange} placeholder="100001" error={errors.zipCode} />
            </Field>
          </div>
        </div>
      </div>

      {/* ── Payment Information ──────────────────────── */}
      <div className="th-form-section">
        <div className="th-form-section__header">
          <div className="th-form-section__icon-wrap">
            <FontAwesomeIcon icon={faCreditCard} />
          </div>
          <div>
            <h3 className="th-form-section__title">Payment Information</h3>
            <p className="th-form-section__sub">Your card details are encrypted and never stored.</p>
          </div>
        </div>

        {/* Card logos */}
        <div className="th-card-logos">
          {['VISA', 'MC', 'AMEX'].map(b => (
            <span className="th-card-logo" key={b}>{b}</span>
          ))}
        </div>

        <div className="row g-3">
          <div className="col-12">
            <Field label="Card Number *" error={errors.cardNumber}>
              <Input name="cardNumber" type="text" value={formData.cardNumber}
                onChange={handleInputChange} placeholder="1234 5678 9012 3456"
                maxLength={16} error={errors.cardNumber} />
            </Field>
          </div>
          <div className="col-sm-7">
            <Field label="Expiry Date *" error={errors.expiryDate}>
              <Input name="expiryDate" type="text" value={formData.expiryDate}
                onChange={handleInputChange} placeholder="MM/YY" error={errors.expiryDate} />
            </Field>
          </div>
          <div className="col-sm-5">
            <Field label="CVV *" error={errors.cvv}>
              <Input name="cvv" type="text" value={formData.cvv}
                onChange={handleInputChange} placeholder="123" maxLength={4} error={errors.cvv} />
            </Field>
          </div>
        </div>
      </div>

      {/* ── Submit ───────────────────────────────────── */}
      <button
        type="submit"
        disabled={isProcessing}
        className="th-checkout-submit"
      >
        {isProcessing ? (
          <>
            <span className="th-checkout-submit__spinner" />
            Processing payment…
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faLock} />
            Pay {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalAmount)}
          </>
        )}
      </button>

      <p className="th-checkout-secure-note">
        <FontAwesomeIcon icon={faLock} className="me-1" />
        Secured with 256-bit SSL encryption
      </p>
    </form>
  );
};

export default CheckoutForm;

/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faLock } from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button';
import StateLgaDropdown from '../../components/StateLgaDropdown';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    required.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation
    const phoneRegex = /^\d{11}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 11 digits';
    }

    // Card validation
    const cardRegex = /^\d{16}$/;
    if (!cardRegex.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    // Expiry validation
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry must be in MM/YY format';
    }

    // CVV validation
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    // ZIP validation
    const zipRegex = /^\d{6}$/;
    if (!zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = 'ZIP code must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Random failure for demo
      if (Math.random() < 0.2) {
        throw new Error('Payment failed');
      }

      // Save order to localStorage if user is logged in
      if (user) {
        const order = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          items: cartItems.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            thumbnail: item.thumbnail
          })),
          total: totalAmount,
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email
        };

        const existingOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
        existingOrders.push(order);
        localStorage.setItem(`orders_${user.id}`, JSON.stringify(existingOrders));
      }

      clearCart();
      navigate('/success', {
        state: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          state: formData.state,
        }
      });
    } catch (_error) {
      navigate('/failure');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information *
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Shipping Address *
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <StateLgaDropdown
                selectedState={formData.state}
                onStateChange={(state) => setFormData(prev => ({ ...prev, state }))}
              />
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information *
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
          Payment Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number *
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.cardNumber && <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.expiryDate && <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV *
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.cvv && <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button *
      <Button
        type="submit"
        loading={isProcessing}
        className="w-full py-3 text-lg"
        icon={faLock}
      >
        {isProcessing ? 'Processing Payment...' : `Pay $${totalAmount.toFixed(2)}`}
      </Button>
    </form>
  );
};

export default CheckoutForm;*/