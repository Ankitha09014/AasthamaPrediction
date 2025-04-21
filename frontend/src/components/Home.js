import React from 'react';
import './Home.css';
import asthmaImage from './asthma.jpg'; // Replace with the correct path to your image

const Home = () => {
  return (
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
};

export default Home;
