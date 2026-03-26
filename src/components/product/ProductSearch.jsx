import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ProductSearch = ({ value, onChange, placeholder = 'Search products…' }) => {
  return (
    <div className="th-search-wrap">
      <FontAwesomeIcon icon={faSearch} className="th-search-wrap__icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="th-input th-input--search"
      />
    </div>
  );
};

export default ProductSearch;

