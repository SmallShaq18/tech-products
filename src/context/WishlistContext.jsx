/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {

    if (!user) return;

    try {
      const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlist(stored);
    } catch { setWishlist([]); }
  }, [user]);

  //console.log(`wishlist by ${user} is ${wishlist}`);

  useEffect(() => {

    if (!user) return;

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    // Read current state synchronously for the toast check
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [
        ...prev,
        {
          id:          product.id,
          title:       product.title,
          price:       product.price,
          thumbnail:   product.thumbnail,
          rating:      product.rating,
          description: product.description || '',  // ← fix crash on Wishlist page
          category:    product.category,
          stock:       product.stock,
          brand:       product.brand,
          addedAt:     new Date().toISOString(),
        },
      ];
    });
    // Toast must be OUTSIDE the updater to avoid "setState during render" warning
    setTimeout(() => {
      const inList = wishlist.some(item => item.id === product.id);
      if (inList) toast.info(`${product.title} is already in your wishlist`);
      else toast.success(`${product.title} added to wishlist!`);
    }, 0);
  };

  const removeFromWishlist = (productId) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) toast.info(`${product.title} removed from wishlist`);
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist  = (productId) => wishlist.some(item => item.id === productId);
  const clearWishlist = () => { setWishlist([]); toast.info('Wishlist cleared'); };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};