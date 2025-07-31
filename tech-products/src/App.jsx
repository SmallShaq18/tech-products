import {Route, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
//import ThemeProvider from './contexts/ThemeProvider';
import Layout from './pages/Layout';
import Home from './pages/Homepage';
import NoPage from './pages/NoPage';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutPageCart from './pages/CheckoutPageCart';
import Cart from './pages/Cart';
import Success from './pages/Success';
import './App.css';

export default function App(){

  //Initialize cartItems from localStorage or an empty array
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(storedCartItems);
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    //calculate new total amount
    let newTotal = 0;
    cartItems.forEach(item => {
       newTotal = newTotal + parseInt(item.price * item.quantity);
    });
    setTotalAmount(newTotal);

    //update localStorage whenever cartItems change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);

  

  return (

    <div className='app'>
    <Layout />
    <Routes>

      <Route path="/" index element={<Home />} />
      <Route path="/productsList" element={<ProductsList cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path="/productDetails/:productId" element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems}
      totalAmount={totalAmount} />} />
      <Route path="/checkoutPageCart" element={<CheckoutPageCart totalAmount={totalAmount} cartItems={cartItems} />} />
      <Route path="/checkoutPage/:productId" element={<CheckoutPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<NoPage />} />

    </Routes>
    </div>
    );  
}


