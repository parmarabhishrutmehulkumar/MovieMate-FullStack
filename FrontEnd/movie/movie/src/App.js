import React from 'react'
import Register from './Pages/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
//import Navbar from './Components/Navbar';
import Home from './Pages/Home';


function App() {
  return (

   <Router> 
     
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<><Home />
    
        </>} />
       
      </Routes>
  
   </Router>   

  )
}

export default App
