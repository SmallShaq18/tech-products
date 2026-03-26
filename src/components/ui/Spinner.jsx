import React from 'react';

/**
 * Spinner — loading indicator
 * sizes: sm | md | lg | xl
 * variants: default | accent | invert
 */
const Spinner = ({ size = 'md', variant = 'default', className = '' }) => (
  <span
    className={['th-spinner', `th-spinner--${size}`, `th-spinner--${variant}`, className]
      .filter(Boolean).join(' ')}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;

