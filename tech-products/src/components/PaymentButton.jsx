import React, { useState, useEffect} from 'react';
import StateLgaDropdown from './StateLgaDropdown';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Success from '../pages/Success';

export default function PaymentButton ({ amount, onSuccess, onError }) {

  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [state, setState] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [isSection, setIsSection] = useState(false);
  const [valError, setValError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  
  const isBtnActive = cardNumber.trim() !== '' && lastname.trim() !== '' && expiryDate.trim() !== '' && 
  cvv.trim() !== '' && firstname.trim() !== '' && address.trim() !== '' && 
  zip.trim() !== '' && phoneNo.trim() !== '';

function validate() {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!/^\d{16}$/.test(cardNumber)) {
    setValError('Card number must be 16 digits.');
    return false;
  }

  if (!expiryRegex.test(expiryDate)) {
    setValError('Expiry must be in MM/YY format.');
    return false;
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    setValError('CVV must be 3 or 4 digits.');
    return false;
  }

  if (!/^\d{6}$/.test(zip)) {
    setValError('ZIP code must be 6 digits.');
    return false;
  }

  if (!/^\d{11}$/.test(phoneNo)) {
    setValError('Phone number must be 11 digits.');
    return false;
  }

  setValError('');
  return true;
}

  const handlePayment = (e) => {

    e.preventDefault();

    if (validate()){
    
      //Call the mock payment service
    PaymentService(amount, isSection, setIsSection)
      .then(response => {
        // Handle successful payment response
        setIsLoading(true);
        onSuccess(response);
      })
      .catch(error => {
        // Handle payment failure
        setIsLoading(true);
        onError(error.message || 'Payment failed')
        console.log('fail');
        // 👇 Navigate to the failure page
        setTimeout(() => {
          navigate("/failure");
        }, 2000);
      });
      
      return;
      
    }

  };

  const navigate = useNavigate();


  return (
    <div className="">
      

      <div className={isLoading ? "blur-content" : "d-flex justify-content-center align-items-center mt-3 paymentbtn position-relative"}>
  {/* Payment form */}
      <form className="addnew-form ">

      <h4>Shipping Info</h4>
      <p>Please fill all fields below with correct information</p>
      <hr />
      <div className="row">
      <div className="form-group col-md-6 p-3">
        <label className="mb-1">First Name:</label>
         <div className="">
          <input type="name" name="name" value={firstname} required onInput={(e) => setFirstname(e.target.value)} />
         </div>
        </div>

        <div className="form-group col-md-6 p-3">
        <label className="mb-1">Last Name:</label>
         <div className="">
          <input type="name" name="name" value={lastname} required onInput={(e) => setLastname(e.target.value)} />
         </div>
        </div>
      </div>

      <div className='row'><StateLgaDropdown selectedState={state} setSelectedState={setState} lgas={city} setLgas={setCity} /></div>

      <label className="d-block mb-1">Address</label>
        
          <input type="text" value={address} required  onInput={(e) => setAddress(e.target.value)} />

        <div className="row">
        <div className="form-group col-md-6 p-3">
        <label className="mb-1">Zip</label>
         <div className="">
          <input type="number" inputMode='numeric' pattern="\d{6}" maxLength={6} placeholder="6-digit ZIP code" value={zip} required onInput={(e) => setZip(e.target.value)} />
         </div>
        </div>

        <div className="form-group col-md-6 p-3">
        <label className="mb-1">Phone Number:</label>
         <div className="">
          <input type="number" inputMode='numeric' name="number" value={phoneNo} pattern="\d{11}" maxLength={11} minLength={11}
           placeholder="11-digit Phone Number" required onInput={(e) => setPhoneNo(e.target.value)} />
         </div>
        </div>
        </div>

        <br/>
        <br/>
        <br/>

       <h4>Card Info:</h4>
       <p>Please fill all fields below with correct information</p>
       <hr />
       <div className="form-group row p-3">
        <label className=" col-sm-3">Card Number:</label>
         <div className="col-sm-9">
          <input type="number" value={cardNumber} pattern="\d{16}" maxLength={16} minLength={16} placeholder="Card Number" required
          inputMode='numeric' onInput={(e) => setCardNumber(e.target.value)} />
         </div>
        </div>

      <div className="form-group row p-3">
        <label className=" col-sm-3">Expiry Date:</label>
         <div className="col-sm-9">
          <input type="text" value={expiryDate} pattern="(0[1-9]|1[0-2])\/\d{2}" placeholder="MM/YY"
          maxLength={5} required onInput={(e) => setExpiryDate(e.target.value)} />
         </div>
        </div>

      <div className="form-group row p-3">
        <label className=" col-sm-3">Cvv:</label>
         <div className="col-sm-9">
          <input type="number" inputMode='numeric' value={cvv} pattern="\d{3,4}" maxLength={4} minLength={3}
          placeholder="CVV" required onInput={(e) => setCvv(e.target.value)} />
         </div>
        </div>

        


        {/* Loading Spinner */}
      {isLoading && (
  <div className="loading-overlay">
    <div className="spinner-border text-primary" role="status"></div>
  </div>
)}

        {isBtnActive ? (
          <button className=" p-2 btn-dark text-white fw-bold" disabled={isLoading} onClick={handlePayment}>PLACE ORDER</button>
        ): (
          <button className=" p-2 btn-secondary fw-bold disabled" disabled>PLACE ORDER</button>
        )}

        {valError && <div style={{color: 'red'}}>{valError}</div>}
        

      </form>
</div>

      

      
      {/* Success Section */}

      {isSection && (
        setTimeout(() => {
      navigate("/success", {
        state: {
          firstname,
          lastname,
          address,
          state,
        }
      });
    }, 0)
      )
      }
    </div>
  );
  
}

const PaymentService = (amount, isSection, setIsSection) => {

    // Simulate a random failure 20% of the time
    const randomFailure = Math.random() < 0.2;
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        if (randomFailure) {
          const error = new Error('Payment failed due to network/validation. Make sure you entered correct details and try again.');
          console.error(error);
          reject(error);
        } else {
          // Simulate a successful payment
          console.log(`Payment successful. Amount: ${amount}`);
          setTimeout(() => {
        setIsSection(!isSection);
      }, 2000);
          resolve('');
        }
      }, 1000); // Simulate some processing time
    }); 

  };
