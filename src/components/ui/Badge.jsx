import React from 'react';

/**
 * Badge — pill-shaped status label
 * variants: default | primary | success | warning | danger | accent
 * sizes: sm | md | lg
 */
const Badge = ({ children, variant = 'default', size = 'md', dot = false, className = '' }) => {
  const base = 'th-badge-ui';
  const v = `th-badge-ui--${variant}`;
  const s = `th-badge-ui--${size}`;

  return (
    <span className={[base, v, s, className].filter(Boolean).join(' ')}>
      {dot && <span className="th-badge-ui__dot" />}
      {children}
    </span>
  );
};

export default Badge;

