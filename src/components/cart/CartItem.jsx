import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.pId);
    } else {
      updateQuantity(item.pId, newQuantity);
    }
  };

  const handleRemove = () => removeFromCart(item.pId);

  return (
    <div className="th-cart-item">
      {/* Thumbnail */}
      <Link to={`/product/${item.pId}`} className="th-cart-item__img-wrap">
        <img src={item.pic} alt={item.name} className="th-cart-item__img" />
      </Link>

      {/* Info */}
      <div className="th-cart-item__body">
        <Link to={`/product/${item.pId}`} className="th-cart-item__name">
          {item.name}
        </Link>
        <span className="th-cart-item__unit-price">{formatCurrency(item.price)} each</span>

        {/* Qty controls */}
        <div className="th-qty">
          <button
            className="th-qty__btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className="th-qty__val">{item.quantity}</span>
          <button
            className="th-qty__btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      {/* Right: subtotal + remove */}
      <div className="th-cart-item__right">
        <span className="th-cart-item__subtotal">
          {formatCurrency(item.price * item.quantity)}
        </span>
        <button
          className="th-cart-item__remove"
          onClick={handleRemove}
          aria-label="Remove item"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

