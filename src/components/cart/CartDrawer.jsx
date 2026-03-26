import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingBag, faArrowRight } from '@fortawesome/free-solid-svg-icons';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden:  { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'tween', duration: 0.32, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    x: '100%',
    transition: { type: 'tween', duration: 0.26, ease: [0.4, 0, 1, 1] },
  },
};

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, totalAmount } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 50;
  const remainingForFree = Math.max(0, freeShippingThreshold - totalAmount);
  const shippingProgress = Math.min(100, (totalAmount / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="th-drawer-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            className="th-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* ── Header ─────────────────────────────────── */}
            <div className="th-drawer__header">
              <div className="th-drawer__header-left">
                <FontAwesomeIcon icon={faShoppingBag} className="th-drawer__bag-icon" />
                <div>
                  <span className="th-drawer__title">Your Cart</span>
                  <span className="th-drawer__count">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>
              <button className="th-drawer__close" onClick={onClose} aria-label="Close cart">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* ── Free shipping bar ───────────────────────── */}
            {cartItems.length > 0 && (
              <div className="th-drawer__ship-bar">
                {remainingForFree > 0 ? (
                  <p className="th-drawer__ship-text">
                    Add <strong>{formatCurrency(remainingForFree)}</strong> more for free shipping
                  </p>
                ) : (
                  <p className="th-drawer__ship-text th-drawer__ship-text--achieved">
                    🎉 You've unlocked free shipping!
                  </p>
                )}
                <div className="th-drawer__ship-track">
                  <div
                    className="th-drawer__ship-fill"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* ── Items ──────────────────────────────────── */}
            <div className="th-drawer__body">
              {cartItems.length === 0 ? (
                <motion.div
                  className="th-drawer__empty"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="th-drawer__empty-icon">
                    <FontAwesomeIcon icon={faShoppingBag} />
                  </div>
                  <p className="th-drawer__empty-title">Your cart is empty</p>
                  <p className="th-drawer__empty-sub">
                    Looks like you haven't added anything yet.
                  </p>
                  <Link
                    to="/products"
                    className="th-btn th-btn--primary"
                    onClick={onClose}
                    style={{ marginTop: 20 }}
                  >
                    Browse Products
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.pId}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ delay: index * 0.06, duration: 0.22 }}
                    >
                      <CartItem item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* ── Footer ─────────────────────────────────── */}
            {cartItems.length > 0 && (
              <motion.div
                className="th-drawer__footer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {/* Subtotal row */}
                <div className="th-drawer__total-row">
                  <span className="th-drawer__total-label">Subtotal</span>
                  <span className="th-drawer__total-val">{formatCurrency(totalAmount)}</span>
                </div>
                <p className="th-drawer__tax-note">Tax &amp; shipping calculated at checkout</p>

                {/* Actions */}
                <div className="th-drawer__actions">
                  <Link
                    to="/cart"
                    className="th-btn th-btn--outline"
                    onClick={onClose}
                    style={{ flex: 1 }}
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    className="th-btn th-btn--primary"
                    onClick={onClose}
                    style={{ flex: 2 }}
                  >
                    Checkout
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

