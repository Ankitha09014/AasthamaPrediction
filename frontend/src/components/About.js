import React from 'react';
import './About.css';
import profile1 from './Aastha.jpg';
import profile2 from './Ambika.jpg';
import profile3 from './Ankitha.jpg';
import profile4 from './Ruchitha.jpg';

const resourcePersons = [
  {
    name: "Aastha Londhe",
    usn: "NNM22AD001",
    image: profile1,
    github: "https://github.com/AasthaLondhe14"
  },
  {
    name: "Ambika Jayashanthi",
    usn: "NNM22AD005",
    image: profile2,
    github: "https://github.com/AmbikaJayashanthi"
  },
  {
    name: "Ankitha",
    usn:'NNM22AD011',
    image: profile3,
    github: "https://github.com/Ankitha09014"
  },
  {
    name: "Ruchitha Prabhu",
    usn: 'NNM22AD045',
    image: profile4,
    github: "https://github.com/Ruchitha654"
  }
];

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>Asthma Prediction</h1>
        <p>Empowering your future with precision forecasts</p>
      </header>

      <main className="about-content">
        {/* First: Resource Persons */}
        <section className="resource-persons">
          <h1>Developers</h1>
          <div className="person-grid">
            {resourcePersons.map((person, index) => (
              <div key={index} className="person-card">
                <img src={person.image} alt={person.name} className="person-image" />
                <div className="person-info">
                  <h3>{person.name}</h3>
                  <p>{person.usn}</p>
                  <a
                    href={person.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Then: About Us */}
        <section className="about-section">
          <h2>About Us</h2>
          <p>
            In Asthma prediction, we specialize in forecasting and analytics across finance, technology, and healthcare.
            Our mission is to empower businesses and individuals with data-driven insights and forward-looking predictions.
          </p>
          <p>
            With a team of expert analysts and a robust data modeling framework, we help you make smart, timely decisions.
            We believe in transparency, accuracy, and staying ahead of trends to bring unmatched predictive value.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
