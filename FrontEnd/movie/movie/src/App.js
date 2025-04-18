import React from 'react';
import Register from './Pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import About from './Pages/About';
import CustomerService from './Pages/CustomerService';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<CustomerService />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
