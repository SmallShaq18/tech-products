import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Link, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '../components/Pagination';


export default function ProductsList({ cartItems, setCartItems }) {
  return (
    <div className="productslist-body">
      <ProductsApp cartItems={cartItems} setCartItems={setCartItems} />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
}

function ProductsApp({ cartItems, setCartItems }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const productsPerPage = 10; // Can change this

  const customAllCategories = ['laptops', 'smartphones', 'mobile-accessories', 'tablets'];

useEffect(() => {
  const fetchProducts = async () => {
    try {
      let products = [];

      if (selectedCategory === 'all') {
        const requests = customAllCategories.map((cat) =>
          axios.get(`https://dummyjson.com/products/category/${cat}`)
        );
        const responses = await Promise.all(requests);

        // Flatten the results
        products = responses.flatMap((res) => res.data.products);
      } else {
        const res = await axios.get(`https://dummyjson.com/products/category/${selectedCategory}`);
        products = res.data.products;
      }
      setAllProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  fetchProducts();
}, [selectedCategory]);

useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [currentPage]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/products/categories');
      const techSlugs = [ 'laptops', 'smartphones', 'lighting', 'automotive',
        'smart-home', 'smart-watches', 'mobile-accessories', 'gaming', 'tablets',
      ];

      const techCategories = res.data
        .filter((catObj) => techSlugs.includes(catObj.slug))
        .map((catObj) => catObj.slug); // extract just the slugs

      setCategories(techCategories);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  fetchCategories();
}, []);

useEffect(() => {
  const category = searchParams.get('category') || 'all';
  const pageParam = parseInt(searchParams.get('page')) || 1;
  const page = isNaN(pageParam) ? 1 : pageParam;

  setSelectedCategory(category);
  setCurrentPage(page);
}, [searchParams]);

const handleCategoryChange = (e) => {
  setSelectedCategory(e.target.value);
  setSearchParams({ category: e.target.value, page: 1 });
};

// When changing page:
const handlePageChange = (newPage) => {
  setSearchParams({ category: selectedCategory, page: newPage
  });
};


  const filteredProducts = allProducts.filter(product => {
    const nameMatches = product.title.toLowerCase().includes(filterText.toLowerCase());
    const inStockMatches = !inStockOnly || product.stock > 0;
    return nameMatches && inStockMatches;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  return (
    <div>
      <h2 className="text-center m-5">TECH GADGETS PRODUCTS LIST</h2>
      <form className="d-flex align-items-center justify-content-center my-2">
        <input type="text" value={filterText} placeholder="Search for products..." className="p-2 inputt bg-white"
          onChange={(e) => setFilterText(e.target.value)} />
      </form>
      <div className="d-flex mx-5 px-5 check">
        <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="mb-3" />
        <p className="px-2">In Stock Only ({currentProducts.length} items found in this page)</p>
      </div>
      <div className="d-flex justify-content-center cat">
      <select className="form-select my-4" value={selectedCategory}
       onChange={/*(e) => setSelectedCategory(e.target.value)*/ handleCategoryChange} style={{ maxWidth: "400px", width: "400%" }} >
        <option value="all" >All</option>
        {categories.map((cat) => (
        <option key={cat} value={cat} >
        {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}
        </option>
        ))}
      </select>

</div>
      {currentProducts.length > 0 ? (
        <List filteredProducts={currentProducts} cartItems={cartItems} setCartItems={setCartItems} filterText={filterText} />
      ) : (
        <p className="text-center fw-bold">
          Sorry, no products match your search or stock filter.
        </p>
      )}
      <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
         onPageChange={handlePageChange} />
    </div>
  );
}

function List({ filteredProducts, cartItems, setCartItems, filterText }) {

  return (
    <div className="row justify-content-center">
      <AnimatePresence>
        {filteredProducts.map(product => (
        <motion.div  key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} style={{ width: '400px', margin: '10px' }}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className=" rounded shadow p-4 bg-white col-md-4" >
          <ListItems key={product.id} products={product} cartItems={cartItems} setCartItems={setCartItems}
           filterText={filterText} />
        </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ListItems({ products, cartItems, setCartItems, filterText }) {

  const isAvailable = products.stock > 0;

 function handleAddToCart(e) {
  e.preventDefault();
  const existingItem = cartItems.find(item => item.pId === products.id);

  if (existingItem) {
    // Increase quantity
    const updatedCart = cartItems.map(item =>  item.pId === products.id ? { ...item, quantity: item.quantity + 1 }
       : item
    );
    setCartItems(updatedCart);
  } else {
    // New item, add to cart
    const newCartItem = { pId: products.id,  name: products.title, price: products.price, pic: products.thumbnail,
      quantity: 1, };
    setCartItems([...cartItems, newCartItem]);
  }

  toast("Added A Product To Cart!", { autoClose: 1000, closeOnClick: true });
}

  const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-300 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const renderStars = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-400" />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-yellow-400" />
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={regularStar} className="text-gray-300" />
      );
    }
  }

  return stars;
};

  return (
    <div className="shadow m-4 p-3 responlist card">
      <img src={products.thumbnail} width="60%" height="80%" alt={products.title} className="img img-fluid imgg mx-auto d-block" />
      <div className="d-flex justify-content-between m-2">
        <h5 className="text-uppercase">{highlightMatch(products.title, filterText)}</h5>
        <h5 className="fw-bold px-2">${products.price}</h5>
      </div>
      <div className="flex items-center gap-1">
        {renderStars(products.rating)}
          <span className="text-sm text-gray-500 ml-1">({products.rating})</span>
      </div>

      <div className='fs-6 text-end px-2'>
        {isAvailable ? <p><b>In Stock</b></p> : <p className="text-secondary">Out of Stock</p>}
      </div>
      <div className="d-flex justify-content-between m-2 responblock">
        <Link to={`/productDetails/${products.id}`} className="cta2 btn p-2 bg-dark text-white">View Product Description</Link>
        {isAvailable ? (
          <button className="btnn" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} className='cartt text-dark' />
          </button>
        ) : (
          <button className="btnn text-secondary" disabled>
            <FontAwesomeIcon icon={faShoppingCart} className="cartt" />
          </button>
        )}
      </div>
    </div>
  );
}

