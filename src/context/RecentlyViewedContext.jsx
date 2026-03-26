/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const RecentlyViewedContext = createContext();

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const { user } = useAuth();
  const MAX_ITEMS = 10;

  useEffect(() => {
    if (!user) return;

  try {
    const stored = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentlyViewed(stored);
  } catch {
    setRecentlyViewed([]);
  }
}, [user]);

useEffect(() => {
  if (!user) return;

  localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed.slice(0, MAX_ITEMS)));
}, [recentlyViewed, user]);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      // If same as the most recent, no-op to avoid repeated updates
      if (prev.length > 0 && prev[0].id === product.id) {
        return prev;
      }
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const value = {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed
  };

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};