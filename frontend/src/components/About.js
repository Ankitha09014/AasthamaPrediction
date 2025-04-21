import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h2>About This Project</h2>
      <p>
        This project uses a machine learning model to predict asthma exacerbation risks. The system collects
        features like age, gender, peak flow, cough intensity, and medication use to analyze a patient's
        likelihood of asthma worsening. The prediction can be used by healthcare professionals for preventive care.
      </p>
    </div>
  );
};

export default About;
