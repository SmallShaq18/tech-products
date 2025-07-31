import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination d-flex gap-2 justify-content-center mt-4">
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          disabled={page === '...'}
          className={`btn btn-sm p-2 m-2 my-5 ${page === currentPage ? 'btn-dark' : 'btn-outline-secondary'}`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;