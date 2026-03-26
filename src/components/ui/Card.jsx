import React from 'react';

/**
 * Card family — surface container components
 */
const Card = ({ children, className = '', onClick, hover = true, flush = false }) => {
  const classes = [
    'th-card',
    hover   ? 'th-card--hover' : '',
    flush   ? 'th-card--flush' : '',
    onClick ? 'th-card--clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`th-card__header ${className}`}>{children}</div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`th-card__body ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`th-card__footer ${className}`}>{children}</div>
);

export { Card, CardHeader, CardBody, CardFooter };
export default Card;


