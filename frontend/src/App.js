import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import About from './components/About';
import LoginSignup from './components/LoginSignup';
import Predict from './components/Predict';
import Footer from './components/Footer';
import asthmaImage from './components/asthma.jpg'; // Ensure this path is correct
import './components/Home.css';
import './App.css';
import './components/Navbar.css';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => (
  <div className="home-container">
    <h1>Welcome to Asthma Predictor</h1>
    <img src={asthmaImage} alt="Asthma Awareness" className="home-image" />
    <p>
      Asthma is a chronic respiratory condition that affects millions globally, leading to breathing difficulties,
      wheezing, and coughing. Early detection and management are essential in preventing severe asthma attacks.
      Our machine learning-based predictor helps identify individuals at risk of asthma exacerbations using
      health data such as oxygen levels, medication use, and cough intensity. This can assist healthcare
      providers in taking proactive measures for better patient care.
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar /> {/* Always visible */}
      <ToastContainer />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/predict" element={<Predict />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
