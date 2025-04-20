import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // 👈 Don't forget to create this CSS file

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1>Welcome to <span>Car Parunge</span></h1>
        <div className="home-links">
          <Link to="/cars" className="home-button">Explore Cars</Link>
          <Link to="/sell" className="home-button">Sell Your Car</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
