// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; Asthma Predictor</p>
      <a href="/about" className="footer-about-link">About Us</a>
    </footer>
  );
};

export default Footer;
