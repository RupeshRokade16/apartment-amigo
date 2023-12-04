import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Features from '../pages/Features/Features';
import About from '../pages/About/About';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import UserDashboard from '../pages/UserDashboard/UserDashboard';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        {/* Additional routes can go here */}
      </Routes>
    </Router>
  );
};

export default Routing;
