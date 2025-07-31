import React, {forwardRef} from "react";

const Print = forwardRef((props, ref) => {

    const {cartItems, totalAmount} = props;
    const now = new Date().toLocaleString(); // current date & time

    return(
        <div ref={ref} className="p-5">
            
            <h4 className="text-center mb-4">Shaq Tech Products Receipt</h4>
            <h6 className="text-center">Total Number Of Products: {cartItems.length}</h6>
            <h6 className="text-center">Receipt generated on: {now}</h6>
            <table className="mt-3 table table-dark table-striped">
                <thead>
                    <tr>
                        <th>P_ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                    <tr key={item.pId} >
                        <td>{item.pId}</td>
                        <td>{item.name}</td>
                        <td className="text-end">{item.quantity}</td>
                        <td className="text-end">{`$${item.price}`}</td>
                    </tr>
                    ))}
                    {/*<tr>
                        <td></td>
                        <td className='fw-bold'>
                            Total Amount:
                        </td>
                        <td className='fw-bold'>
                            {`$${totalAmount}`}
                        </td>
                        <td>
                        </td>
                        <td></td>
                    </tr>*/}
                    <tr className="fw-bold border-top">
  <td colSpan="3" className="text-center">Total Amount:</td>
  <td className="text-center">${totalAmount}</td>
</tr>

                </tbody>
            </table>

        </div>
    );
});

Print.displayName = "Print"; // Set display name for debugging
export default Print;