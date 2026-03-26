// ── Success.jsx ──────────────────────────────────────────────
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowRight, faHome } from '@fortawesome/free-solid-svg-icons';

const Success = () => {
  const location = useLocation();
  const { firstName, lastName, address, state } = location.state || {};

  if (!firstName || !lastName) return <Navigate to="/checkout" replace />;

  return (
    <div className="th-result-page">
      <div className="th-result-card th-result-card--success">
        {/* Icon */}
        <div className="th-result-card__icon th-result-card__icon--green">
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>

        {/* Copy */}
        <h1 className="th-result-card__title">Payment Successful</h1>
        <p className="th-result-card__sub">
          Thank you, <strong>{firstName} {lastName}</strong>!<br />
          Your order is on its way to <strong>{address}</strong>, {state} State.
        </p>

        {/* Order confirmation chip */}
        <div className="th-result-card__chip">
          <span className="th-result-card__chip-dot" />
          Order confirmed · Processing now
        </div>

        {/* Actions */}
        <div className="th-result-card__actions">
          <Link to="/products" className="th-btn th-btn--primary">
            Continue Shopping
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
          <Link to="/orders" className="th-btn th-btn--outline">
            View Orders
          </Link>
          <Link to="/" className="th-btn th-btn--ghost">
            <FontAwesomeIcon icon={faHome} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;

