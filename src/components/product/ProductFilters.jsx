import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSliders } from '@fortawesome/free-solid-svg-icons';

const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  inStockOnly,
  onInStockChange,
  priceRange,
  onPriceRangeChange,
}) => {
  const sortOptions = [
    { value: 'rating',     label: 'Top Rated' },
    { value: 'price-low',  label: 'Price: Low → High' },
    { value: 'price-high', label: 'Price: High → Low' },
    { value: 'name',       label: 'Name A–Z' },
  ];

  return (
    <div className="th-filters">
      {/*<div className="th-filters__header">
        <FontAwesomeIcon icon={faSliders} />
        <span>Filters</span>
      </div>*/}

      <div className="th-filters__body">
        {/* Search */}
        <div className="th-filters__group th-filters__group--search">
          <label className="th-filters__label">Search</label>
          <div className="th-search-wrap">
            <FontAwesomeIcon icon={faSearch} className="th-search-wrap__icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products…"
              className="th-input th-input--search"
            />
          </div>
        </div>

        {/* Category */}
        <div className="th-filters__group">
          <label className="th-filters__label">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="th-select"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="th-filters__group">
          <label className="th-filters__label">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="th-select"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Price range */}
        <div className="th-filters__group">
          <label className="th-filters__label">
            Max Price
            <span className="th-filters__price-val">${priceRange.toLocaleString()}</span>
          </label>
          <div className="th-range-wrap">
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange}
              onChange={(e) => onPriceRangeChange(Number(e.target.value))}
              className="th-range"
              style={{ '--pct': `${(priceRange / 2000) * 100}%` }}
            />
            <div className="th-range__labels">
              <span>$0</span>
              <span>$2,000</span>
            </div>
          </div>
        </div>

        {/* In stock toggle */}
        <div className="th-filters__group th-filters__group--toggle">
          <label className="th-toggle">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockChange(e.target.checked)}
              className="th-toggle__input"
            />
            <span className="th-toggle__track">
              <span className="th-toggle__thumb" />
            </span>
            <span className="th-toggle__label">In stock only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;

