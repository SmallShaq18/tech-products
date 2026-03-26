import React, { useState, useEffect } from 'react';
import { Link }       from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth }    from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const stored = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
      setOrders(stored.reverse()); // newest first
    }
  }, [user]);

  console.log(orders);


  /* ── Not logged in ────────────────────────────────── */
  if (!user) {
    return (
      <div className="th-page-state th-page-state--center" style={{ minHeight: 500 }}>
        <div className="th-page-state__icon">
          <FontAwesomeIcon icon={faBoxOpen} />
        </div>
        <h2 className="th-page-state__title">Sign in to view orders</h2>
        <p className="th-page-state__sub">Your order history lives here once you're signed in.</p>
        <Link to="/login" className="th-btn th-btn--primary" style={{ marginTop: 20 }}>
          Sign In <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    );
  }

  /* ── Empty ────────────────────────────────────────── */
  if (orders.length === 0) {
    return (
      <main className="th-orders-page">
        <div className="container">
          <div className="th-orders-page__header">
            <span className="th-sec-label">Account</span>
            <h1 className="th-sec-title mb-0">Order History</h1>
          </div>
          <div className="th-page-state th-page-state--center" style={{ minHeight: 360 }}>
            <div className="th-page-state__icon">
              <FontAwesomeIcon icon={faBoxOpen} />
            </div>
            <h2 className="th-page-state__title">No orders yet</h2>
            <p className="th-page-state__sub">When you place an order, it'll appear here.</p>
            <Link to="/products" className="th-btn th-btn--primary" style={{ marginTop: 20 }}>
              Start Shopping <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="th-orders-page">
      <div className="container">
        <div className="th-orders-page__header">
          <div>
            <span className="th-sec-label">Account</span>
            <h1 className="th-sec-title mb-0">Order History</h1>
          </div>
          <span className="th-orders-page__count">
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="th-orders-list">
          {orders.map((order) => (
            <div key={order.id} className="th-order-card">
              {/* Order header */}
              <div className="th-order-card__header">
                <div className="th-order-card__meta">
                  <span className="th-order-card__id">
                    Order <span className="th-order-card__id-val">#{order.id.slice(-8).toUpperCase()}</span>
                  </span>
                  <span className="th-order-card__date">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </span>
                </div>
                <span className="th-order-card__status">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Delivered
                </span>
              </div>

              {/* Items */}
              <div className="th-order-card__items">
                {order.items.map((item) => (
                  <div key={item.id} className="th-order-item">
                    <div className="th-order-item__img-wrap">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="th-order-item__img"
                      />
                    </div>
                    <div className="th-order-item__body">
                      <span className="th-order-item__title">{item.title}</span>
                      <span className="th-order-item__qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="th-order-item__price">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="th-order-card__footer">
                <div className="th-order-card__address">
                  <span className="th-order-card__address-label">Delivered to</span>
                  <span className="th-order-card__address-val">{order.shippingAddress}</span>
                </div>
                <div className="th-order-card__total">
                  <span className="th-order-card__total-label">Order Total</span>
                  <span className="th-order-card__total-val">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Orders;

