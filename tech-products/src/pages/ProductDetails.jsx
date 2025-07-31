import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function DetailItems({ cartItems, setCartItems }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [productId]);

  function handleAddToCart(e) {
  e.preventDefault();
  const existingItem = cartItems.find(item => item.pId === product.id);
  if (existingItem) {
    // Increase quantity
    const updatedCart = cartItems.map(item =>
      item.pId === product.id ? { ...item, quantity: item.quantity + 1 }: item );
    setCartItems(updatedCart);
  } else {
    // New item, add to cart
    const newCartItem = { pId: product.id, name: product.title, price: product.price, pic: product.thumbnail,
      quantity: 1, };
    setCartItems([...cartItems, newCartItem]);
  }
  toast("Added A Product To Cart!", { autoClose: 1000, closeOnClick: true });
}

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!product) return <p className="text-center text-muted">Product not found.</p>;

  return (
    <div className="row row-deets pb-5">
      <div className="col-md-4 details">
        <button onClick={() => navigate(-1)} className="text-white d-lg-none btn btn-sm btn-outline-secondary">
          ← Back
        </button>
        <img src={product.thumbnail} alt={product.title} className="img img-fluid img-deets" />
      </div>

      <div className="col-md-6">
        <h2>{product.title}</h2>
        <h4>${product.price}</h4>
        <br />
        <h5>Description</h5>
        <p>{product.description}</p>
        <h5>Brand</h5>
        <p>{product.brand}</p>
        <h5>Category</h5>
        <p>{product.category}</p>

        <div>
          <p><b>{product.stock > 0 ? "In Stock" : "Not In Stock"}</b></p>
        </div>

        <div className="d-flex my-2">
          <Link to={`/checkoutPage/${product.id}`} rel="noopener noreferrer" className={product.stock > 0 ? 
          "cta btn p-2 bg-light text-dark details" : "disabled cta btn p-2 bg-dark text-white"} >
            Proceed To Pay
          </Link>

          {product.stock > 0 ? (
            <button className="btnn details" onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-shopping fw-bold cartt"></i>
            </button>
          ) : (
            <button className="btnn text-secondary" disabled>
              <i className="fa-solid fa-cart-shopping fw-bold cartt"></i>
            </button>
          )}

          <ToastContainer closeOnClick />
        </div>
      </div>

      <div className="col-md-2"></div>
    </div>
  );
}

export default function ProductDetails({ cartItems, setCartItems }) {
  return (
    <div className="p-5 container-fluid p-details">
      <DetailItems cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
}
