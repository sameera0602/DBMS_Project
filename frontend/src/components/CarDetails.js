import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarDetails.css'; // 👈 Import CSS file

const CarDetails = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/${carId}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    fetchCarDetails();
  }, [carId]);

  if (!car) return <div className="loading">Loading...</div>;

  return (
    <div className="car-details-container">
      <div className="car-details-card">
        <img src={car.image_url} alt={car.car_name} className="car-details-image" />
        <h1>{car.car_name}</h1>
        <p><strong>Brand:</strong> {car.brand}</p>
        <p><strong>Model Year:</strong> {car.model_year}</p>
        <p><strong>Price:</strong> ₹{car.price}</p>
        <button onClick={() => navigate(`/payment/${carId}`)}>Buy Now</button>
      </div>
    </div>
  );
};

export default CarDetails;
