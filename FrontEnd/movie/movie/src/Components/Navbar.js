import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // Track authentication status

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  const handleAuthAction = () => {
    if (isSignedIn) {
      // Perform logout logic here
      setIsSignedIn(false);
      alert("You have been logged out.");
    } else {
      // Redirect to login page
      alert("Redirecting to login page...");
    }
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
    >
      <motion.div className="navbar-logo" whileHover={{ scale: 1.1 }}>
        <Link to="/home">🎬 MovieMate</Link>
      </motion.div>

      <div className="menu-icon" onClick={toggleMenu}>
        {isMobile ? <FiX /> : <FiMenu />}
      </div>

      <ul
        className={isMobile ? "navbar-links-mobile" : "navbar-links"}
        onClick={() => setIsMobile(false)}
      >
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to="/home">🏠 Home</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to="/about">📖 About Us</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to="/service">🛠 Customer Service</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <button className="auth-button" onClick={handleAuthAction}>
            {isSignedIn ? "🚪 Logout" : "🔑 Sign In"}
          </button>
        </motion.li>
      </ul>
    </motion.nav>
  );
}

export default Navbar;
