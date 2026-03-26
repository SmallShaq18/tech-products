import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider }           from './context/CartContext';
import { WishlistProvider }       from './context/WishlistContext';
import { AuthProvider }           from './context/AuthContext';
import { ReviewsProvider }        from './context/ReviewsContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { ToastContainer }         from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout        from './pages/Layout';
import Home          from './pages/Home';
import Products      from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart          from './pages/Cart';
import Checkout      from './pages/Checkout';
import Success       from './pages/Success';
import Failure       from './pages/Failure';
import Login         from './pages/Login';
import Register      from './pages/Register';
import Orders        from './pages/Orders';
import Wishlist      from './pages/Wishlist';
import NoPage        from './pages/NoPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './styles/techhub-premium.css';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  in:      { opacity: 1, y: 0,  transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
  out:     { opacity: 0, y: -10, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

/* Wrap each route to keep the route map DRY */
const Page = ({ children }) => (
  <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ReviewsProvider>
            <RecentlyViewedProvider>
              <div className="app">
                <Layout />

                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/"              element={<Page><Home /></Page>} />
                    <Route path="/products"      element={<Page><Products /></Page>} />
                    <Route path="/product/:productId" element={<Page><ProductDetails /></Page>} />
                    <Route path="/cart"          element={<Page><Cart /></Page>} />
                    <Route path="/checkout"      element={<Page><Checkout /></Page>} />
                    <Route path="/success"       element={<Page><Success /></Page>} />
                    <Route path="/failure"       element={<Page><Failure /></Page>} />
                    <Route path="/login"         element={<Page><Login /></Page>} />
                    <Route path="/register"      element={<Page><Register /></Page>} />
                    <Route path="/orders"        element={<Page><Orders /></Page>} />
                    <Route path="/wishlist"      element={<Page><Wishlist /></Page>} />
                    <Route path="*"              element={<Page><NoPage /></Page>} />
                  </Routes>
                </AnimatePresence>

                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  toastClassName="th-toast"
                />
              </div>
            </RecentlyViewedProvider>
          </ReviewsProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

/*import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ReviewsProvider } from './context/ReviewsContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Failure from './pages/Failure';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import NoPage from './pages/NoPage';
import './styles/global.css';
import './styles/theme.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ReviewsProvider>
            <RecentlyViewedProvider>
              <div className="app">
                <Layout />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:productId" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/failure" element={<Failure />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="*" element={<NoPage />} />
                </Routes>
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
            </RecentlyViewedProvider>
          </ReviewsProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
*/

