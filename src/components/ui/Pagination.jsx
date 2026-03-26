import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // All logic preserved exactly
  const getPageNumbers = () => {
    const pages = [];
    const max = 5;

    if (totalPages <= max) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push('…');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('…');
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('…');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push('…');
      pages.push(totalPages);
    }
    return pages;
  };

  const go = (page) => {
    if (page !== '…' && page !== currentPage) onPageChange(page);
  };

  const prev = () => { if (currentPage > 1) onPageChange(currentPage - 1); };
  const next = () => { if (currentPage < totalPages) onPageChange(currentPage + 1); };

  return (
    <nav className="th-pagination" aria-label="Pagination">
      {/* Prev */}
      <button
        className="th-page-btn th-page-btn--nav"
        onClick={prev}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {/* Numbers */}
      {getPageNumbers().map((page, i) =>
        page === '…' ? (
          <span className="th-page-ellipsis" key={`e${i}`}>…</span>
        ) : (
          <button
            key={page}
            className={`th-page-btn ${page === currentPage ? 'th-page-btn--active' : ''}`}
            onClick={() => go(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        className="th-page-btn th-page-btn--nav"
        onClick={next}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </nav>
  );
};

export default Pagination;

