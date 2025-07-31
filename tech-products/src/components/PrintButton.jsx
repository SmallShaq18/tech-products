import React from "react";
//import { useReactToPrint } from 'react-to-print';
//import Print from "./Print";

const PrintButton = ({handlePrint}) => {
    

    return(
        <div>
            <button onClick={handlePrint} className={"cta2 btn p-2 text-decoration-underline fw-bold text-white lh-1"}>Print Receipt</button>
        </div>
    );
};

export default PrintButton;