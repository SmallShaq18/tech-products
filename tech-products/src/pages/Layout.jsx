import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Layout() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3 navbar-custom">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">
          🛍️ Products
        </Link>

        <button className={`navbar-toggler ${isOpen ? "open" : ""}`} type="button" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto navv">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)} end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/productsList" className="nav-link" onClick={() => setIsOpen(false)}>
                PRODUCTS
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link" onClick={() => setIsOpen(false)}>
                CARTS
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
