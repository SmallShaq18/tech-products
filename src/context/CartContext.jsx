import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems]     = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = useAuth();



  // Hydrate from localStorage on mount
  useEffect(() => {
  if (!user) return;

  try {
    const stored = JSON.parse(localStorage.getItem('cartItems')) || [];

    // clone before reversing (important)
    setCartItems([...stored].reverse());
  } catch {
    setCartItems([]);
  }
}, [user]); // ✅ include user
  
     //console.log(`Cartitems by ${user} is ${cartItems}`);

  // Persist + recalculate total whenever cartItems changes
  useEffect(() => {
  if (!user) return;

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  setTotalAmount(total);
}, [cartItems, user]); // ✅ include user

  const addToCart = (product) => {
    // Determine whether item already exists BEFORE calling setState
    // so we can fire the correct toast outside the updater
    const existing = cartItems.find(item => item.pId === product.id);

    setCartItems(prev => {
      if (prev.some(item => item.pId === product.id)) {
        // Increment quantity — pure update, no side effects
        return prev.map(item =>
          item.pId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // New item
      return [
        ...prev,
        {
          pId:      product.id,
          name:     product.title,
          price:    product.price,
          pic:      product.thumbnail,
          quantity: 1,
        },
      ];
    });

    // Toast fires OUTSIDE the updater — no setState-during-render
    if (existing) {
      toast.info(`Increased quantity of ${product.title}`);
    } else {
      toast.success(`${product.title} added to cart!`);
    }
  };

  const removeFromCart = (pId) => {
    // Read the item before mutating state
    const item = cartItems.find(item => item.pId === pId);

    setCartItems(prev =>
      prev
        .map(i => i.pId === pId ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0)
    );

    // Toast outside updater
    if (item) {
      if (item.quantity > 1) {
        toast.info(`Removed one ${item.name} from cart`);
      } else {
        toast.error(`${item.name} removed from cart`);
      }
    }
  };

  const updateQuantity = (pId, newQuantity) => {
    if (newQuantity <= 0) {
      const item = cartItems.find(i => i.pId === pId);
      setCartItems(prev => prev.filter(i => i.pId !== pId));
      if (item) toast.error(`${item.name} removed from cart`);
    } else {
      setCartItems(prev =>
        prev.map(item => item.pId === pId ? { ...item, quantity: newQuantity } : item)
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};