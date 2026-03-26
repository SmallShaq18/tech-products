/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 16 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
};

const RecentlyViewed = () => {
  const { recentlyViewed } = useRecentlyViewed();
  if (recentlyViewed.length === 0) return null;

  return (
    <motion.section
      className="th-rv"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="th-rv__header">
        <div className="th-rv__header-left">
          <span className="th-rv__icon-wrap">
            <FontAwesomeIcon icon={faClockRotateLeft} />
          </span>
          <span className="th-rv__title">Recently Viewed</span>
        </div>
        <Link to="/products" className="th-rv__see-all">
          See all
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

      {/* Grid */}
      <div className="row g-3">
        {recentlyViewed.slice(0, 4).map((product) => (
          <motion.div
            key={product.id}
            className="col-6 col-md-3"
            variants={itemVariants}
          >
            <Link to={`/product/${product.id}`} className="th-rv-card">
              {/* Image */}
              <div className="th-rv-card__img-wrap">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="th-rv-card__img"
                  loading="lazy"
                />
              </div>

              {/* Body */}
              <div className="th-rv-card__body">
                <p className="th-rv-card__title">
                  {product.title.length > 32
                    ? `${product.title.substring(0, 32)}…`
                    : product.title}
                </p>
                <span className="th-rv-card__price">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecentlyViewed;