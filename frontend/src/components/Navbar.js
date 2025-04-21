import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Asthma Predictor</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/predict">Predict</Link></li>
        <li><Link to="/login">Login/Signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
