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
          <h2>About This Project</h2>
          <p>
          In this project, a full-stack web application for asthma prediction was developed, integrating machine learning with a user-friendly interface. The system utilizes a K-Nearest Neighbors (KNN) model trained on a medical dataset, which provides real-time asthma predictions based on user inputs. The backend is built using Flask to serve the machine learning model, while MongoDB and Node.js/Express handle user authentication and data management. The frontend, developed in React, offers a dynamic and responsive interface to display predictions along with key performance metrics such as accuracy, precision, recall, and F1-score. This application aims to help individuals monitor asthma risks and seek timely medical attention, contributing to improved healthcare outcomes. The system is designed to be easily scalable and adaptable to other healthcare prediction tasks.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;