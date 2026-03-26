import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faTruck, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
  const { cartItems, totalAmount } = useCart();
  const itemCount  = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const tax        = totalAmount * 0.08;
  const shipping   = totalAmount >= 50 ? 0 : 4.99;
  const grandTotal = totalAmount + tax + shipping;

  const rows = [
    { icon: faTag,     label: `Subtotal (${itemCount} item${itemCount !== 1 ? 's' : ''})`, value: formatCurrency(totalAmount) },
    { icon: faTruck,   label: 'Shipping',  value: shipping === 0 ? 'Free' : formatCurrency(shipping), highlight: shipping === 0 },
    { icon: faReceipt, label: 'Tax (8%)',  value: formatCurrency(tax) },
  ];

  return (
    <div className="th-summary">
      <h3 className="th-summary__title">Order Summary</h3>

      <div className="th-summary__rows">
        {rows.map((row) => (
          <div className="th-summary__row" key={row.label}>
            <span className="th-summary__row-label">
              <FontAwesomeIcon icon={row.icon} className="th-summary__row-icon" />
              {row.label}
            </span>
            <span className={`th-summary__row-val ${row.highlight ? 'th-summary__row-val--green' : ''}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="th-summary__total">
        <span className="th-summary__total-label">Total</span>
        <span className="th-summary__total-val">{formatCurrency(grandTotal)}</span>
      </div>

      {shipping > 0 && (
        <p className="th-summary__ship-hint">
          Add {formatCurrency(50 - totalAmount)} more to unlock free shipping
        </p>
      )}
    </div>
  );
};

export default CartSummary;

