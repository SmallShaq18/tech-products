/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate login - in real app, this would be an API call
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = storedUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userData = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };

  const register = (name, email, password) => {
    // Simulate registration
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = storedUsers.find(u => u.email === email);

    if (existingUser) {
      toast.error('User with this email already exists');
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In real app, this would be hashed
      createdAt: new Date().toISOString()
    };

    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    toast.success(`Welcome, ${name}! Your account has been created.`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};