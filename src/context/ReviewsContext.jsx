/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const ReviewsContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) throw new Error('useReviews must be used within a ReviewsProvider');
  return context;
};

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    try {
      const stored = JSON.parse(localStorage.getItem('reviews')) || {};
      setReviews(stored);
    } catch { setReviews({}); }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews, user]);

  const addReview = (productId, review) => {
    const newReview = {
      id:   Date.now().toString(),
      date: new Date().toISOString(),
      ...review,
    };
    // Pure update — no side effects inside
    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newReview],
    }));
    // Toast outside updater
    toast.success('Review added successfully!');
  };

  const getReviewsForProduct = (productId) => reviews[productId] || [];

  const getAverageRating = (productId) => {
    const r = getReviewsForProduct(productId);
    if (!r.length) return 0;
    return r.reduce((acc, rv) => acc + rv.rating, 0) / r.length;
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getReviewsForProduct, getAverageRating }}>
      {children}
    </ReviewsContext.Provider>
  );
};