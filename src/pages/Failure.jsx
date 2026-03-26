import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle, faRotateLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Failure = () => (
  <div className="th-result-page">
    <div className="th-result-card th-result-card--failure">
      {/* Icon */}
      <div className="th-result-card__icon th-result-card__icon--red">
        <FontAwesomeIcon icon={faXmarkCircle} />
      </div>

      {/* Copy */}
      <h1 className="th-result-card__title">Payment Failed</h1>
      <p className="th-result-card__sub">
        We couldn't process your payment. This can happen due to incorrect card
        details, insufficient funds, or a temporary issue with your bank.
        Please check your details and try again.
      </p>

      {/* Help tips */}
      <div className="th-result-card__tips">
        <span className="th-result-card__tip">Check your card number and expiry</span>
        <span className="th-result-card__tip">Ensure sufficient funds are available</span>
        <span className="th-result-card__tip">Try a different payment method</span>
      </div>

      {/* Actions */}
      <div className="th-result-card__actions">
        <Link to="/checkout" className="th-btn th-btn--primary">
          <FontAwesomeIcon icon={faRotateLeft} />
          Try Again
        </Link>
        <Link to="/cart" className="th-btn th-btn--outline">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Cart
        </Link>
      </div>
    </div>
  </div>
);

export default Failure;

