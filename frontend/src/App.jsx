// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Home from './pages/home';
import Login from './components/login';
import AdminLogin from './components/adminlogin';
import AdminDashboard from './components/admindashboard';
import Cart from './pages/cart';

function App() {
  return (
    <Router>
      <Routes>
     

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/cart" element={<Cart />} />
      
      
      </Routes>
    </Router>
  );
}

export default App;
