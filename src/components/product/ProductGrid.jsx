// ── ProductGrid.jsx ──────────────────────────────────────────
import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const ProductGrid = ({ products, loading, error }) => {
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => b.rating - a.rating);
  }, [products]);

  if (loading) {
    return (
      <div className="th-grid-state">
        <div className="th-grid-spinner">
          <Spinner size="large" />
        </div>
        <p className="th-grid-state__text">Loading products…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="th-grid-state th-grid-state--error">
        <div className="th-grid-state__icon th-grid-state__icon--red">
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </div>
        <p className="th-grid-state__title">Failed to load products</p>
        <p className="th-grid-state__text">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="th-grid-state">
        <div className="th-grid-state__icon">
          <FontAwesomeIcon icon={faBoxOpen} />
        </div>
        <p className="th-grid-state__title">No products found</p>
        <p className="th-grid-state__text">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {sortedProducts.map((product, index) => (
          <div key={product.id}
        className="col-12 col-sm-6 col-md-4 col-xl-3"
        >
          <ProductCard product={product} index={index} />
      </div>
      ))}
    </div>
  );
};

export default ProductGrid;

