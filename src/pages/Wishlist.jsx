import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faShoppingCart, faHeart,
  faArrowRight, faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useWishlist } from '../context/WishlistContext';
import { useCart }     from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  /* ── Empty state ──────────────────────────────────── */
  if (wishlist.length === 0) {
    return (
      <main className="th-wishlist-page">
        <div className="container">
          <div className="th-wishlist-page__header">
            <span className="th-sec-label">Saved</span>
            <h1 className="th-sec-title mb-0">My Wishlist</h1>
          </div>
          <div className="th-page-state th-page-state--center" style={{ minHeight: 380 }}>
            <div className="th-page-state__icon">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <h2 className="th-page-state__title">Your wishlist is empty</h2>
            <p className="th-page-state__sub">
              Save products you love and come back to them anytime.
            </p>
            <Link to="/products" className="th-btn th-btn--primary" style={{ marginTop: 20 }}>
              Browse Products <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="th-wishlist-page">
      <div className="container">
        <div className="th-wishlist-page__header">
          <div>
            <span className="th-sec-label">Saved</span>
            <h1 className="th-sec-title mb-0">
              My Wishlist
              <span className="th-wishlist-page__count">{wishlist.length}</span>
            </h1>
          </div>
          <button
            className="th-btn-ui th-btn-ui--danger th-btn-ui--sm"
            onClick={clearWishlist}
          >
            <FontAwesomeIcon icon={faTrash} />
            Clear All
          </button>
        </div>

        <div className="row g-4">
          {wishlist.map((product) => (
            <div key={product.id} className="col-sm-6 col-lg-4 col-xl-3">
              <div className="th-wish-card">
                {/* Remove button */}
                <button
                  className="th-wish-card__remove"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label="Remove from wishlist"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>

                {/* Image */}
                <Link to={`/product/${product.id}`} className="th-wish-card__img-wrap">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="th-wish-card__img"
                  />
                </Link>

                {/* Body */}
                <div className="th-wish-card__body">
                  <Link to={`/product/${product.id}`} className="th-wish-card__title">
                    {product.title.length > 48
                      ? `${product.title.substring(0, 48)}…`
                      : product.title}
                  </Link>

                  <p className="th-wish-card__desc">
                    {(product.description || '').length > 80
                      ? `${product.description.substring(0, 80)}…`
                      : (product.description || 'No description available.')}
                  </p>

                  <div className="th-wish-card__meta">
                    <span className="th-wish-card__price">
                      {formatCurrency(product.price)}
                    </span>
                    <div className="th-wish-card__rating">
                      <FontAwesomeIcon icon={faStar} className="th-wish-card__star" />
                      <span>{(product.rating || 4.5).toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="th-wish-card__actions">
                    <button
                      className="th-btn th-btn--primary th-wish-card__cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                      Add to Cart
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="th-btn th-btn--outline th-wish-card__view-btn"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Wishlist;

