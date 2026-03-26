/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      delay: i * 0.065,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const ProductCard = memo(({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.info('Please sign in to add items to cart');
      return;
    }
    addToCart(product);
  };

  const rating    = product.rating || 4.5;
  const filled    = Math.floor(rating);
  const inStock   = product.stock > 0;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{ height: '100%' }}
    >
      <Link to={`/product/${product.id}`} className="th-product-card">

        {/* ── Image ──────────────────────────────────────── */}
        <div className="th-product-card__img">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
          />

          {/* Quick-add overlay — appears on card hover */}
          <div className="th-product-card__overlay">
            <button
              className="th-product-card__quick"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {inStock ? 'Quick Add' : 'Out of Stock'}
            </button>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────── */}
        <div className="th-product-card__body">

          <h3 className="th-product-card__title">{product.title}</h3>

          {/* Stars */}
          <div className="th-stars">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={`th-star ${i < filled ? 'th-star--on' : ''}`}
              />
            ))}
            <span className="th-stars__ct">({rating})</span>
          </div>

          {/* Price + stock */}
          <div className="th-product-card__foot">
            <span className="th-product-card__price">
              {formatCurrency(product.price)}
            </span>
            <span className={`th-pill ${inStock ? 'th-pill--green' : 'th-pill--red'}`}>
              <span className="th-pill__dot" />
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

        </div>
      </Link>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;

