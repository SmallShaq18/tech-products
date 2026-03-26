import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingBag, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useCart }     from '../context/CartContext';
import CartItem        from '../components/cart/CartItem';
import CartSummary     from '../components/cart/CartSummary';

const Cart = () => {
  const { cartItems } = useCart();

  /* ── Empty state ──────────────────────────────────── */
  if (cartItems.length === 0) {
    return (
      <main className="th-cart-page">
        <div className="container">
          <Link to="/products" className="th-back-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            Continue Shopping
          </Link>
          <div className="th-page-state th-page-state--center" style={{ minHeight: 420 }}>
            <div className="th-page-state__icon">
              <FontAwesomeIcon icon={faShoppingBag} />
            </div>
            <h2 className="th-page-state__title">Your cart is empty</h2>
            <p className="th-page-state__sub">
              Looks like you haven't added anything yet. Explore the catalogue to get started.
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
    <main className="th-cart-page">
      <div className="container">
        <Link to="/products" className="th-back-link">
          <FontAwesomeIcon icon={faArrowLeft} />
          Continue Shopping
        </Link>

        <div className="th-cart-page__header">
          <span className="th-sec-label">Review</span>
          <h1 className="th-sec-title mb-0">Shopping Cart</h1>
        </div>

        <div className="row g-5 align-items-start">
          {/* Items */}
          <div className="col-lg-8">
            <div className="th-cart-list">
              {cartItems.map((item) => (
                <CartItem key={item.pId} item={item} />
              ))}
            </div>
          </div>

          {/* Summary + actions */}
          <div className="col-lg-4">
            <CartSummary />
            <div className="th-cart-page__actions">
              <Link to="/checkout" className="th-btn th-btn--primary" style={{ flex: 1 }}>
                Proceed to Checkout
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link to="/products" className="th-btn th-btn--outline" style={{ flex: 1 }}>
                Keep Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
