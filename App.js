import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import CarList from './components/CarList';
import SellNow from './components/SellNow';
import CarDetails from './components/CarDetails';
import PaymentPage from './components/PaymentPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/sell" element={<SellNow />} />
        <Route path="/car-details/:carId" element={<CarDetails />} />
        <Route path="/payment/:carId" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
