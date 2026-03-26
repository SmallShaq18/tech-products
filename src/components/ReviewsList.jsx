import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { useReviews } from '../context/ReviewsContext';

const ReviewsList = ({ productId }) => {
  const { getReviewsForProduct } = useReviews();
  const reviews = getReviewsForProduct(productId);

  if (reviews.length === 0) {
    return (
      <div className="th-reviews-empty">
        <div className="th-reviews-empty__icon">
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
        <p className="th-reviews-empty__title">No reviews yet</p>
        <p className="th-reviews-empty__sub">Be the first to share your experience with this product.</p>
      </div>
    );
  }

  /* Average rating */
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="th-reviews">
      {/* Summary bar */}
      <div className="th-reviews__summary">
        <span className="th-reviews__avg">{avg}</span>
        <div className="th-reviews__summary-right">
          <div className="th-reviews__summary-stars">
            {[1,2,3,4,5].map((n) => (
              <FontAwesomeIcon
                key={n}
                icon={faStar}
                className={`th-review-star ${n <= Math.round(avg) ? 'th-review-star--on' : ''}`}
              />
            ))}
          </div>
          <span className="th-reviews__summary-count">
            Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* List */}
      <div className="th-reviews__list">
        {reviews.map((review) => (
          <div key={review.id} className="th-review-card">
            {/* Meta row */}
            <div className="th-review-card__meta">
              <div className="th-review-card__avatar">
                {review.userName.charAt(0).toUpperCase()}
              </div>
              <div className="th-review-card__author">
                <span className="th-review-card__name">{review.userName}</span>
                <span className="th-review-card__date">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                </span>
              </div>
              <div className="th-review-card__stars ms-auto">
                {[1,2,3,4,5].map((n) => (
                  <FontAwesomeIcon
                    key={n}
                    icon={faStar}
                    className={`th-review-star th-review-star--sm ${n <= review.rating ? 'th-review-star--on' : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* Comment */}
            <p className="th-review-card__body">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;

