import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

const Failure = () => {

  return (
    <div className=" text-center mt-5 p-4">
      <div className="mb-3 text-danger mt-5">
        <i className="fas fa-times-circle fa-3x"></i>
      </div>

      <p className="fs-5 fw-semibold text-capitalize text-dark">
        Unfortunately, your payment was not successful. Please try again later or contact support for assistance.
      </p>

      <Link to="/productsList" className="btn btn-dark mt-3">
        Back To Products
      </Link>
    </div>
  );
};

export default Failure;