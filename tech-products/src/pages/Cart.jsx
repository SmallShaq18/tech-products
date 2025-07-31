import React from 'react';
import {Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRef} from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintButton from '../components/PrintButton.jsx';
import Print from '../components/Print.jsx';

export default function Cart({cartItems, setCartItems, totalAmount}){
    
    return <CartTable  cartItems={cartItems} setCartItems={setCartItems} 
    totalAmount={totalAmount} />
}

function Table({ cartItems, setCartItems, totalAmount }) {


    const handleRemoveFromCart = (pId) => {
    const updatedCart = cartItems.map(item =>
      item.pId === pId ? { ...item, quantity: item.quantity - 1 }
        : item)
    .filter(item => item.quantity > 0); // remove if quantity becomes 0
    toast(`Removed Item From Cart`, { autoClose: 500, closeOnClick: true });

    setCartItems(updatedCart);
};
    
    const contentRef = useRef(null);
    const handlePrint = useReactToPrint({
    contentRef: contentRef, }) // Use contentRef instead of content});
    

    return(

       <div className="d-flex justify-content-center table-div container">
            <div className="table-div table-responsive">
            <h5 className='my-4'>Number Of Products: {cartItems.length}</h5>  
            <h5 className='my-4'>Total Quantity: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</h5>  
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>P_ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                    <tr key={`cart-${item.pId}`} >
                        <td>{item.pId}</td>
                        <td>{item.name} ( x {item.quantity})</td>
                        <td>{`$${item.price * item.quantity }`}</td>
                        <td>
                        <Link to={`/productDetails/${item.pId}`} rel="noopener noreferrer" className="cta2 btn p-2 text-decoration-underline text-white lh-1" >View Description</Link>
                        </td>
                        <td>
                        <button onClick={() => handleRemoveFromCart(item.pId)} className="btn fw-bold text-danger btn-hov">
                            {item.quantity > 1 ? 'Remove One' : 'Remove'}
                        </button>
                        </td>
                    </tr>
                    ))}
                    <tr key="summary">
                        <td></td>
                        <td className='fw-bold'>
                            Total Amount:
                        </td>
                        <td className='fw-bold'>
                            {`$${totalAmount}`}
                        </td>
                        <td>
                            <PrintButton handlePrint={handlePrint} />
                        </td>
                        <td>
                            <Link to="/checkoutPageCart" rel="noopener noreferrer" className={"cta2 btn p-2 text-decoration-underline fw-bold text-white lh-1"} >Proceed To Pay</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className='d-none'>
              <Print ref={contentRef} cartItems={cartItems} totalAmount={totalAmount}  />
            </div>
        </div>

    );
}

function CartTable({products, cartItems, setCartItems, totalAmount}){

    return(

        <div>
            <div>
                {cartItems.length > 0 ? (
                    <Table products={products} cartItems={cartItems} setCartItems={setCartItems} 
                    totalAmount={totalAmount} />
                ) : (<h3 className="text-center mt-3">There are no items in the cart</h3>)
                }
            </div>
            <ToastContainer closeOnClick />
        </div>

    );
}