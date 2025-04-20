import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PaymentPage.css'; // 👈 Import the CSS

const PaymentPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  const handlePayment = () => {
    alert('✅ Payment Successful!');
    navigate('/cars');
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Pay for Car #{carId}</h2>
        <p>Confirm your payment to book the car.</p>
        <button onClick={handlePayment}>💳 Pay Now</button>
      </div>
    </div>
  );
};

export default PaymentPage;

