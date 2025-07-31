import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const { firstname, lastname, state, address } = location.state || {};

  if (!firstname || !lastname) {
  return <Navigate to="/checkoutPageCart" replace />;
}


  return (
    <div className=" text-center mt-5 p-4">
      <div className="mb-3 text-success mt-5">
        <i className="fas fa-check-circle fa-3x"></i>
      </div>

      <p className="fs-5 fw-semibold text-capitalize text-dark">
        {`Congratulations ${firstname} ${lastname}! You have placed your order successfully and it will be delivered to
         ${address} in ${state} State soon. Keep in touch.`}
      </p>

      <Link to="/productsList" className="btn btn-dark mt-3">
        Back To Products
      </Link>
    </div>
  );
};

export default Success;
