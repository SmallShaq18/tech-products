import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingBag, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useCart }     from '../context/CartContext';
import CheckoutForm    from '../components/checkout/CheckoutForm';
import CartSummary     from '../components/cart/CartSummary';

const Checkout = () => {
  const { cartItems } = useCart();

  /* ── Empty cart guard ─────────────────────────────── */
  if (cartItems.length === 0) {
    return (
      <main className="th-checkout-page">
        <div className="container">
          <div className="th-page-state th-page-state--center" style={{ minHeight: 420 }}>
            <div className="th-page-state__icon">
              <FontAwesomeIcon icon={faShoppingBag} />
            </div>
            <h2 className="th-page-state__title">Nothing to check out</h2>
            <p className="th-page-state__sub">
              Add products to your cart before proceeding.
            </p>
            <Link to="/products" className="th-btn th-btn--primary" style={{ marginTop: 20 }}>
              Browse Products
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="th-checkout-page">
      <div className="container">
        <Link to="/cart" className="th-back-link">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Cart
        </Link>

        <div className="th-checkout-page__header">
          <span className="th-sec-label">Almost there</span>
          <h1 className="th-sec-title mb-0">Checkout</h1>
        </div>

        <div className="row g-5 align-items-start">
          {/* Form */}
          <div className="col-lg-7">
            <CheckoutForm />
          </div>

          {/* Sticky summary */}
          <div className="col-lg-5">
            <div className="th-checkout-page__sticky">
              <p className="th-checkout-page__summary-label">Order Summary</p>
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;

