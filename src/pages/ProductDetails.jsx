import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import {
  faArrowLeft, faShoppingCart, faStar,
  faHeart, faHeartBroken, faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { useProduct }         from '../hooks/useProduct';
import { useCart }            from '../context/CartContext';
import { useWishlist }        from '../context/WishlistContext';
import { useAuth }            from '../context/AuthContext';
import { useRecentlyViewed }  from '../context/RecentlyViewedContext';
import { useReviews }         from '../context/ReviewsContext';
import { formatCurrency }     from '../utils/formatCurrency';
import Spinner                from '../components/ui/Spinner';
import ReviewForm             from '../components/ReviewForm';
import ReviewsList            from '../components/ReviewsList';
import RecentlyViewed         from '../components/RecentlyViewed';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { productId }   = useParams();
  const { product, loading, error } = useProduct(productId);
  const { addToCart }               = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user }                    = useAuth();
  const { addToRecentlyViewed }     = useRecentlyViewed();
  const { getAverageRating, getReviewsForProduct } = useReviews();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) addToRecentlyViewed(product);
  }, [product, addToRecentlyViewed]);

  const handleAddToCart      = () => {
    if (!user) {
      toast.info('Please sign in to add items to cart');
      return;
    }
    if (product) addToCart(product);
  };

  const handleWishlistToggle = () => {
    if (!user) {
      toast.info('Please sign in to use wishlist');
      return;
    }
    if (!product) return;
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  /* ── Loading ──────────────────────────────────────── */
  if (loading) {
    return (
      <div className="th-page-state">
        <Spinner size="lg" />
      </div>
    );
  }

  /* ── Error ────────────────────────────────────────── */
  if (error || !product) {
    return (
      <div className="th-page-state th-page-state--center">
        <div className="th-page-state__icon th-page-state__icon--red">!</div>
        <h2 className="th-page-state__title">Product Not Found</h2>
        <p className="th-page-state__sub">
          {error || "The product you're looking for doesn't exist."}
        </p>
        <Link to="/products" className="th-btn th-btn--primary">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const averageRating = getAverageRating(product.id);
  const reviewCount   = getReviewsForProduct(product.id).length;
  const inWishlist    = isInWishlist(product.id);
  const inStock       = product.stock > 0;
  const displayRating = averageRating || product.rating || 4.5;

  return (
    <main className="th-pd">
      <div className="container">

        {/* Back link */}
        <Link to="/products" className="th-back-link">
          <FontAwesomeIcon icon={faArrowLeft} />
          All Products
        </Link>

        {/* ── Two-column layout ─────────────────────── */}
        <div className="row g-5 align-items-start">

          {/* Image */}
          <div className="col-lg-5">
            <div className="th-pd__img-wrap">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="th-pd__img"
              />
              {/* Category chip */}
              <span className="th-pd__cat-chip">{product.category}</span>
            </div>
          </div>

          {/* Info */}
          <div className="col-lg-7">
            <div className="th-pd__info">

              {/* Brand */}
              <span className="th-pd__brand">{product.brand}</span>

              {/* Title */}
              <h1 className="th-pd__title">{product.title}</h1>

              {/* Rating row */}
              <div className="th-pd__rating-row">
                <div className="th-pd__stars">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`th-review-star ${i < Math.floor(displayRating) ? 'th-review-star--on' : ''}`}
                    />
                  ))}
                </div>
                <span className="th-pd__rating-val">{displayRating.toFixed(1)}</span>
                {reviewCount > 0 && (
                  <span className="th-pd__review-ct">
                    {reviewCount} review{reviewCount !== 1 ? 's' : ''}
                  </span>
                )}
                <span className={`th-pill ${inStock ? 'th-pill--green' : 'th-pill--red'} ms-auto`}>
                  <span className="th-pill__dot" />
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Price */}
              <div className="th-pd__price-row">
                <span className="th-pd__price">{formatCurrency(product.price)}</span>
                {product.discountPercentage > 0 && (
                  <span className="th-pd__discount">
                    {Math.round(product.discountPercentage)}% off
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="th-pd__desc">{product.description}</p>

              {/* Specs grid */}
              <div className="th-pd__specs">
                <div className="th-pd__spec">
                  <span className="th-pd__spec-label">Brand</span>
                  <span className="th-pd__spec-val">{product.brand}</span>
                </div>
                <div className="th-pd__spec">
                  <span className="th-pd__spec-label">Category</span>
                  <span className="th-pd__spec-val" style={{ textTransform: 'capitalize' }}>
                    {product.category}
                  </span>
                </div>
                <div className="th-pd__spec">
                  <span className="th-pd__spec-label">Stock</span>
                  <span className="th-pd__spec-val">{product.stock} units</span>
                </div>
                <div className="th-pd__spec">
                  <span className="th-pd__spec-label">Rating</span>
                  <span className="th-pd__spec-val">{displayRating.toFixed(1)} / 5</span>
                </div>
              </div>

              {/* CTA group */}
              <div className="th-pd__ctas">
                <button
                  className="th-btn th-btn--primary th-pd__btn-cart"
                  onClick={handleAddToCart}
                  disabled={!inStock}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Add to Cart
                </button>
                <button
                  className={`th-pd__btn-wish ${inWishlist ? 'th-pd__btn-wish--active' : ''}`}
                  onClick={handleWishlistToggle}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <FontAwesomeIcon icon={inWishlist ? faHeartBroken : faHeart} />
                </button>
              </div>

              {/* Buy now */}
              <button
                onClick={() => {
                  if (!user) {
                    toast.info('Please sign in to checkout');
                    return;
                  }
                  if (!inStock) return;

                    handleAddToCart();

                  // Navigate to checkout with product (optional, can go directly to cart)
                  //window.location.href = `/checkout?product=${product.id}`;
                  navigate(`/checkout?product=${product.id}`)
                }}
                className={`th-btn th-btn--outline th-pd__btn-buy ${!inStock ? 'th-btn--disabled' : ''}`}
                disabled={!inStock}
                style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}
              >
                <FontAwesomeIcon icon={faBolt} />
                Buy Now
              </button>

            </div>
          </div>
        </div>

        {/* ── Reviews ───────────────────────────────── */}
        <section className="th-pd__reviews-section">
          <div className="th-sec-hd">
            <span className="th-sec-label">Community</span>
            <h2 className="th-sec-title">Customer Reviews</h2>
          </div>
          <div className="row g-5">
            <div className="col-lg-5">
              <ReviewForm productId={product.id} />
            </div>
            <div className="col-lg-7">
              <ReviewsList productId={product.id} />
            </div>
          </div>
        </section>

        {/* ── Recently Viewed ───────────────────────── */}
        <RecentlyViewed />

      </div>
    </main>
  );
};

export default ProductDetails;

