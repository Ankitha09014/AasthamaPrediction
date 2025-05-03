import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // this imports the CSS

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('user');
  });
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    }, 500); // check every half second
  
    return () => clearInterval(interval);
  }, []);
  
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Asthama Predictor</h1>
      <ul className="nav-links">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/about">About</Link></li>
  {!isLoggedIn ? (
    <li><Link to="/login">Login/Signup</Link></li>
  ) : (
    <>
      <li><Link to="/predict">Predict</Link></li>
      <li><Link to="/graph">Graph</Link></li>{/* ✅ Add this line */}
      <li><button onClick={handleLogout}>Logout</button></li>
    </>
  )}
</ul>
    </nav>
  );
};

export default Navbar;
