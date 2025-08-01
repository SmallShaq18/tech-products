import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import PaymentButton from '../components/PaymentButton';
import axios from 'axios';

export default function CheckoutPage () {

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

  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentSuccess = (response) => {
    // Handle success in your app (e.g., navigate to order confirmation)
    setPaymentStatus(`payment successful ${response}`);
  };

  const handlePaymentError = (error) => {
    // Handle error in your app (e.g., display an error message)
    setPaymentStatus(`payment error ${error}`);
  };
  
  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!product) return <p className="text-center text-muted">Product not found.</p>;

  return (
    <div className='row p-5 checkout'>
      <div className="col-md-4 mt-2">
        <button onClick={() => navigate(-1)} className="mb-3 text-dark d-lg-none btn btn-sm btn-outline-dark">
        ← Back
      </button>
            
            <div className="d-flex">
            <img src={product.thumbnail} width="40%" height="60%" alt={product.name} className="img img-fluid imgg" />
              <div className="mt-5">
                <h5 className="text-uppercase">{product.title}</h5>
                <h5 className='fw-bold px-2'>{`$${product.price}`}</h5>
              </div>
            </div>
      </div>

      <div className="col-md-8">
        <PaymentButton amount={product.price} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
        {/*paymentStatus && <p>{`${paymentStatus} - $${product.price}`}</p>*/}
      </div>
    </div>
  );
}