import React, { useState } from 'react';
import axios from 'axios';
import './SellNow.css'; 

const SellNow = () => {
  const [carDetails, setCarDetails] = useState({
    car_name: '',
    brand: '',
    model_year: '',
    price: '',
    status: 'available',
    image_url: '',
    contact_number: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user')); 
      const response = await axios.post('http://localhost:5000/api/cars', {
        ...carDetails,
        owner_id: user.id,
      });
      alert('Car listed successfully');
    } catch (error) {
      alert('Failed to list car');
    }
  };

  return (
    <div className="sell-container">
      <div className="sell-box">
        <h1>Sell Your Car</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="car_name"
            placeholder="Car Name"
            value={carDetails.car_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={carDetails.brand}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="model_year"
            placeholder="Model Year"
            value={carDetails.model_year}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={carDetails.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={carDetails.image_url}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="contact_number"
            placeholder="Contact Number"
            value={carDetails.contact_number}
            onChange={handleInputChange}
            required
          />
          <button type="submit">List Car</button>
        </form>
      </div>
    </div>
  );
};

export default SellNow;
