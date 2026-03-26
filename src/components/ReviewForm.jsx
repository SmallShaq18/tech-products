import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewsContext';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [rating, setRating]         = useState(5);
  const [hovered, setHovered]       = useState(0);
  const [comment, setComment]       = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user }       = useAuth();
  const { addReview }  = useReviews();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;

    setIsSubmitting(true);

    addReview(productId, {
      userId:   user.id,
      userName: user.name,
      rating:   parseInt(rating),
      comment:  comment.trim(),
    });

    setComment('');
    setRating(5);
    if (onReviewAdded) onReviewAdded();
    setIsSubmitting(false);
  };

  /* Not logged in */
  if (!user) {
    return (
      <div className="th-review-form th-review-form--guest">
        <div className="th-review-form__guest-icon">
          <FontAwesomeIcon icon={faStar} />
        </div>
        <p className="th-review-form__guest-title">Share your experience</p>
        <p className="th-review-form__guest-sub">
          <Link to="/login" className="th-review-form__login-link">Sign in</Link>
          {' '}to write a review for this product.
        </p>
      </div>
    );
  }

  const displayRating = hovered || rating;

  return (
    <div className="th-review-form">
      <div className="th-review-form__header">
        <h5 className="th-review-form__title">Write a Review</h5>
        <p className="th-review-form__sub">Your honest feedback helps other shoppers.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Star rating picker */}
        <div className="th-review-form__field">
          <label className="th-review-form__label">Your Rating</label>
          <div className="th-star-picker">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`th-star-picker__star ${n <= displayRating ? 'th-star-picker__star--on' : ''}`}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(0)}
                aria-label={`Rate ${n} star${n !== 1 ? 's' : ''}`}
              >
                <FontAwesomeIcon icon={faStar} />
              </button>
            ))}
            <span className="th-star-picker__label">
              {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][displayRating]}
            </span>
          </div>
        </div>

        {/* Comment */}
        <div className="th-review-form__field">
          <label className="th-review-form__label">Your Review</label>
          <textarea
            className="th-input th-input--textarea"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike? How was the quality?"
            required
          />
          <span className="th-review-form__char-count">
            {comment.length} / 500
          </span>
        </div>

        <button
          type="submit"
          className="th-btn-ui th-btn-ui--primary th-btn-ui--md"
          disabled={isSubmitting || !comment.trim()}
        >
          {isSubmitting ? (
            <><span className="th-btn-ui__spinner" /> Submitting…</>
          ) : (
            <><FontAwesomeIcon icon={faPaperPlane} /> Submit Review</>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;

