import React, { useState } from 'react';
import PaymentButton from '../components/PaymentButton';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPageCart ({totalAmount, cartItems}) {

  const [paymentStatus, setPaymentStatus] = useState(null);
  const cartAmount = `$${totalAmount}`;
  const navigate = useNavigate();

  const handlePaymentSuccess = (response) => {
    // Handle success in your app (e.g., navigate to order confirmation)
    setPaymentStatus(`Payment successful! ${response}`);
    console.log(cartAmount);
  };

  const handlePaymentError = (error) => {
    // Handle error in your app (e.g., display an error message)
    setPaymentStatus(`Payment failed! ${error}`);
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="m-3 text-dark d-lg-none btn btn-sm btn-outline-dark">
        ← Back
      </button>
      <div className='row p-5 checkout'>
      <h2 className='text-uppercase text-center mb-3 checkout-h2'>Your Order</h2>
      <div className="col-md-4 mt-5 checkout-col1">     
      {cartItems.map((item) => (
       <div key={item.pId} className="d-flex">
        {<img src={item.pic} width="15%" height="10%" alt={item.name} className="img img-fluid imgg" />}
              <div className="mt-2">
                <h6 className="text-uppercase">{item.name} ( x {item.quantity}) - {<b>${item.price * item.quantity} </b>}.</h6>
              </div>
       </div>
      ))}  
      <p className='fw-bold mt-3 text-uppercase'>{`Total Amount: ${cartAmount}`}</p>
      </div>
      
      <div className="col-md-8">
        <PaymentButton amount={totalAmount} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
        {paymentStatus && <p>{`${paymentStatus} - ${cartAmount}`}</p>} 
      </div>
    </div>
    </div>
    
  );
}