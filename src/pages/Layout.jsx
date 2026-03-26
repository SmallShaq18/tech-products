import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart, faBars, faTimes, faHeart,
  faUser, faSignOutAlt, faBoxOpen, faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from '../components/cart/CartDrawer';

export default function Layout() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [cartOpen, setCartOpen]       = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled]       = useState(false);

  const userMenuRef = useRef(null);

  const { cartItems }                             = useCart();
  const { wishlist }                              = useWishlist();
  const { user, logout }                          = useAuth();

  const itemCount    = cartItems.reduce((s, i) => s + i.quantity, 0);
  const wishlistCount = wishlist.length;
  const cartCount     = cartItems.reduce((s, i) => s + i.quantity, 0);


  /* shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close user menu on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    setUserMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `th-nav__link ${isActive ? 'th-nav__link--active' : ''}`;

  return (
    <>
      <header className={`th-nav${scrolled ? ' th-nav--scrolled' : ''}`}>
        <div className="container">
          <div className="th-nav__inner">

            {/* ── Logo ─────────────────────────────────── */}
            <Link to="/" className="th-nav__logo">
              Tech<span>Hub</span>
            </Link>

            {/* ── Desktop links ────────────────────────── */}
            <nav className="th-nav__links">
              <NavLink to="/" className={navLinkClass} end>Home</NavLink>
              <NavLink to="/products" className={navLinkClass}>Products</NavLink>
              {user && <NavLink to="/orders" className={navLinkClass}>Orders</NavLink>}
            </nav>

            {/* ── Actions ──────────────────────────────── */}
            <div className="th-nav__actions">

              {user ? (
                <>
                  {/* Wishlist */}
                  <Link to="/wishlist" className="th-nav__icon-btn" aria-label="Wishlist">
                    <FontAwesomeIcon icon={faHeart} />
                    {wishlistCount > 0 && (
                      <span className="th-nav__badge">{wishlistCount}</span>
                    )}
                  </Link>

                  {/* Cart */}
                  <button
                    className="th-nav__icon-btn"
                    onClick={() => setCartOpen(true)}
                    aria-label="Open cart"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {itemCount > 0 && (
                      <span className="th-nav__badge">{itemCount}</span>
                    )}
                  </button>

                  {/* User menu */}
                  <div className="th-nav__user-wrap" ref={userMenuRef}>
                    <button
                      className="th-nav__user-btn"
                      onClick={() => setUserMenuOpen((v) => !v)}
                      aria-expanded={userMenuOpen}
                    >
                      <span className="th-nav__user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="th-nav__user-name">
                        {user.name.split(' ')[0]}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`th-nav__chevron ${userMenuOpen ? 'th-nav__chevron--open' : ''}`}
                      />
                    </button>

                    {userMenuOpen && (
                      <div className="th-nav__dropdown">
                        <div className="th-nav__dropdown-header">
                          <span className="th-nav__dropdown-name">{user.name}</span>
                          <span className="th-nav__dropdown-email">{user.email}</span>
                        </div>
                        <Link
                          to="/orders"
                          className="th-nav__dropdown-item"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FontAwesomeIcon icon={faBoxOpen} />
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="th-nav__dropdown-item"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FontAwesomeIcon icon={faHeart} />
                          Wishlist
                          {wishlistCount > 0 && (
                            <span className="th-nav__dropdown-badge">{wishlistCount}</span>
                          )}
                        </Link>
                        <div className="th-nav__dropdown-divider" />
                        <button
                          onClick={handleLogout}
                          className="th-nav__dropdown-item th-nav__dropdown-item--danger"
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="th-nav__text-link th-nav__desktop-only">
                    Sign In
                  </Link>
                  <Link to="/register" className="th-btn th-btn--primary th-btn-nav">
                    Get Started
                  </Link>
                </>
              )}

              {/* Mobile hamburger — hidden on desktop via CSS */}
              <button
                className="th-nav__hamburger"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile drawer ────────────────────────────── */}
        {mobileOpen && (
          <div className="th-nav__mobile">
            <div className="container">
              <nav className="th-nav__mobile-links">
                <NavLink to="/" className={navLinkClass} end
                  onClick={() => setMobileOpen(false)}>Home</NavLink>
                <NavLink to="/products" className={navLinkClass}
                  onClick={() => setMobileOpen(false)}>Products</NavLink>

                {user ? (
                  <>
                    <NavLink to="/cart" className={navLinkClass}
                      onClick={() => setMobileOpen(false)}>
                        Cart {cartCount > 0 && `(${cartCount})`}
                    </NavLink>
                    <NavLink to="/orders" className={navLinkClass}
                      onClick={() => setMobileOpen(false)}>Orders</NavLink>
                    <NavLink to="/wishlist" className={navLinkClass}
                      onClick={() => setMobileOpen(false)}>
                      Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                    </NavLink>
                    <div className="th-nav__mobile-divider" />
                    <button onClick={handleLogout} className="th-nav__mobile-logout">
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={navLinkClass}
                      onClick={() => setMobileOpen(false)}>Sign In</NavLink>
                    <NavLink to="/register" className={navLinkClass}
                      onClick={() => setMobileOpen(false)}>Register</NavLink>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so content doesn't hide under fixed nav */}
      <div className="th-nav__spacer" />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

