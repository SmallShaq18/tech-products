import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBag,
  faStar,
  faShieldAlt,
  faTruck,
  faArrowRight,
  faBolt,
  faLock,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { fetchFeaturedProducts } from '../services/productService';
import ProductCard from '../components/product/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const products = await fetchFeaturedProducts();
        setFeaturedProducts(products.slice(0, 8));
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const features = [
    {
      icon: faTruck,
      num: '01',
      title: 'Free Shipping',
      desc: 'Complimentary delivery on all orders over $50. Tracked and insured from door to door.',
    },
    {
      icon: faLock,
      num: '02',
      title: 'Secure Payment',
      desc: 'Bank-grade 256-bit encryption on every transaction. Your data never touches our servers.',
    },
    {
      icon: faRotateLeft,
      num: '03',
      title: '30-Day Returns',
      desc: 'Changed your mind? Return anything within 30 days for a full refund, no questions asked.',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      handle: 'Verified Buyer',
      rating: 5,
      comment:
        'Genuinely the best online tech store I\'ve used. Delivery was next day and the packaging was immaculate. Will be back.',
      avatar:
        'https://unsplash.com/photos/woman-with-sunglasses-walking-on-city-street-NkHaLQ36oyQ',
    },
    {
      id: 2,
      name: 'Mike Chen',
      handle: 'Verified Buyer',
      rating: 5,
      comment:
        'Great customer service when I had an issue with my order. Resolved in under an hour. The products themselves are exactly as described.',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 3,
      name: 'Emily Davis',
      handle: 'Verified Buyer',
      rating: 5,
      comment:
        'Love the curation here — everything feels premium. Found products I couldn\'t find anywhere else at this price point.',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
  ];

  const categories = [
    { name: 'Smartphones', sub: '240+ models', slug: 'smartphones', icon: '📱' },
    { name: 'Laptops',     sub: '180+ models', slug: 'laptops',     icon: '💻' },
    { name: 'Tablets',     sub: '90+ models',  slug: 'tablets',     icon: '🖥️' },
    { name: 'Accessories', sub: '600+ items',  slug: 'mobile-accessories', icon: '🎧' },
  ];

  const trustItems = [
    { icon: faTruck,     label: 'Free shipping over $50' },
    { icon: faShieldAlt, label: '2-year warranty' },
    { icon: faRotateLeft,label: '30-day returns' },
    { icon: faLock,      label: 'Secure checkout' },
    { icon: faStar,      label: '4.9 / 5 avg. rating' },
  ];

  return (
    <div>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="th-hero">
        <div className="th-hero__orb-1" />
        <div className="th-hero__orb-2" />
        <div className="th-hero__lines" />

        <div className="container th-hero__inner">
          {/* Main copy */}
          <div className="th-hero__body">
            <div className="col-lg-9 col-xl-7 px-0">
              <div className="th-hero__chip">
                <span className="th-hero__chip-badge">New</span>
                <span className="th-hero__chip-text">Spring collection just dropped</span>
              </div>

              <h1 className="th-hero__h1">
                Technology
                <span className="th-hero__h1-bold">that elevates.</span>
              </h1>

              <div className="th-hero__rule" />

              <p className="th-hero__sub">
                Flagship phones. Pro-grade audio. Next-generation laptops.
                Everything curated for people who demand more.
              </p>

              <div className="th-ctas">
                <Link to="/products" className="th-btn th-btn--primary">
                  <FontAwesomeIcon icon={faShoppingBag} />
                  Shop the Collection
                  <span className="icon"><FontAwesomeIcon icon={faArrowRight} /></span>
                </Link>
                <Link to="/products?category=smartphones" className="th-btn th-btn--ghost-inv">
                  What's new
                </Link>
              </div>
            </div>
          </div>

          {/* Stats footer */}
          <div className="th-hero__stats">
            <div className="th-hero__stat">
              <span className="th-hero__stat-val">50K+</span>
              <span className="th-hero__stat-lbl">Customers</span>
            </div>
            <div className="th-hero__stat">
              <span className="th-hero__stat-val">1,200+</span>
              <span className="th-hero__stat-lbl">Products</span>
            </div>
            <div className="th-hero__stat">
              <span className="th-hero__stat-val">4.9★</span>
              <span className="th-hero__stat-lbl">Avg. Rating</span>
            </div>
            <div className="th-hero__stat">
              <span className="th-hero__stat-val">24h</span>
              <span className="th-hero__stat-lbl">Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST BAR ═══════════════════════════════════════ */}
      <div className="th-trust">
        <div className="container">
          <div className="th-trust__inner">
            {trustItems.map((t, i) => (
              <div className="th-trust__item" key={i}>
                <FontAwesomeIcon icon={t.icon} />
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FEATURES ════════════════════════════════════════ */}
      <section className="th-section th-section--white">
        <div className="container">
          <div className="th-sec-hd th-sec-hd--center">
            <span className="th-sec-label">Why TechHub</span>
            <h2 className="th-sec-title">Built for confidence</h2>
            <p className="th-sec-sub">
              Every policy and promise designed around one thing — your peace of mind.
            </p>
          </div>

          <div className="row g-4">
            {features.map((f) => (
              <div className="col-md-4" key={f.num}>
                <div className="th-feature-card">
                  <span className="th-feature-num">{f.num}</span>
                  <div className="th-feature-icon">
                    <FontAwesomeIcon icon={f.icon} />
                  </div>
                  <h3 className="th-feature-name">{f.title}</h3>
                  <p className="th-feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ═══════════════════════════════ */}
      <section className="th-section">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-5 flex-wrap gap-3">
            <div>
              <span className="th-sec-label">
                <FontAwesomeIcon icon={faBolt} className="me-1" />
                Hand-picked
              </span>
              <h2 className="th-sec-title mb-0">Featured Products</h2>
            </div>
            <Link to="/products" className="th-btn th-btn--outline flex-shrink-0">
              View all
              <span className="icon"><FontAwesomeIcon icon={faArrowRight} /></span>
            </Link>
          </div>

          <div className="row g-4">
            {loading
              ? [...Array(8)].map((_, i) => (
                  <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={i}>
                    <div className="th-skel" style={{ height: 320 }} />
                  </div>
                ))
              : featuredProducts.map((product, index) => (
                  <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={product.id}>
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES ══════════════════════════════════════ */}
      <section className="th-section th-section--white">
        <div className="container">
          <div className="th-sec-hd th-sec-hd--center">
            <span className="th-sec-label">Browse</span>
            <h2 className="th-sec-title">Shop by Category</h2>
            <p className="th-sec-sub">
              Whether you need a new daily driver or the perfect accessory, start here.
            </p>
          </div>

          <div className="row g-3">
            {categories.map((cat) => (
              <div className="col-12 col-lg-3" key={cat.slug}>
                <Link to={`/products?category=${cat.slug}`} className="th-cat-card">
                  <div className="th-cat-card__icon">{cat.icon}</div>
                  <div className="th-cat-card__body">
                    <span className="th-cat-card__name">{cat.name}</span>
                    <span className="th-cat-card__sub">{cat.sub}</span>
                  </div>
                  <span className="th-cat-card__arrow">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════ */}
      <section className="th-section">
        <div className="container">
          <div className="th-sec-hd th-sec-hd--center">
            <span className="th-sec-label">Social Proof</span>
            <h2 className="th-sec-title">Trusted by thousands</h2>
            <p className="th-sec-sub">
              Real reviews from real customers — not cherry-picked, just honest.
            </p>
          </div>

          <div className="row g-4">
            {testimonials.map((t) => (
              <div className="col-md-4" key={t.id}>
                <div className="th-testi-card">
                  <div className="th-testi-stars">
                    {[...Array(t.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="th-testi-star" />
                    ))}
                  </div>
                  <p className="th-testi-body">{t.comment}</p>
                  <div className="th-testi-foot">
                    <img src={t.avatar} alt={t.name} className="th-testi-avatar" />
                    <div>
                      <p className="th-testi-name">{t.name}</p>
                      <span className="th-testi-handle">{t.handle}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

