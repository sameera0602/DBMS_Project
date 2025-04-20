import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CarList.css'; // 👈 Import the CSS file

import i20Image from '../assets/cars/i20.jpg'; // Import image directly
import swiftImage from '../assets/cars/swift.jpg';
import corollaImage from '../assets/cars/corolla.jpg';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  const getCarImage = (carName) => {
    // Return the image based on car name
    if (carName === 'i20') return i20Image;
    if (carName === 'Swift') return swiftImage;
    if (carName === 'Corolla') return corollaImage;

    return null; // Default image if car name is not found
  };

  return (
    <div className="carlist-container">
      <h1>Available Cars</h1>
      <div className="carlist-grid">
        {cars.map((car) => (
          <Link to={`/car-details/${car.id}`} key={car.id} className="car-card">
            <div className="car-content">
              <img src={getCarImage(car.car_name)} alt={car.car_name} className="car-image" />
              <h3>{car.car_name}</h3>
              <p><strong>Brand:</strong> {car.brand}</p>
              <p><strong>Year:</strong> {car.model_year}</p>
              <p><strong>Price:</strong> ₹{car.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CarList;
