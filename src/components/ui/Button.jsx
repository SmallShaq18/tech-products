import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Button — design-system button primitive
 * variants: primary | secondary | success | outline | ghost | danger
 * sizes: sm | md | lg
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconRight,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const base  = 'th-btn-ui';
  const v     = `th-btn-ui--${variant}`;
  const s     = `th-btn-ui--${size}`;
  const state = disabled || loading ? 'th-btn-ui--disabled' : '';

  return (
    <button
      type={type}
      className={[base, v, s, state, className].filter(Boolean).join(' ')}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="th-btn-ui__spinner" />}
      {!loading && icon && (
        <span className="th-btn-ui__icon th-btn-ui__icon--left">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <span className="th-btn-ui__label">{children}</span>
      {!loading && iconRight && (
        <span className="th-btn-ui__icon th-btn-ui__icon--right">
          <FontAwesomeIcon icon={iconRight} />
        </span>
      )}
    </button>
  );
};

export default Button;

