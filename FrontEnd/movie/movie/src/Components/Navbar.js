import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";

function Navbar() {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 75, damping: 12 }}
    >
      <motion.div 
        className="navbar-logo"
        whileHover={{ scale: 1.1 }}
      >
        <Link to="/home">🎬 Movie Recommender</Link>
      </motion.div>

      <motion.ul 
        className="navbar-links"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to="/home">Home</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to="/about">About Us</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to="/service">Customer Service</Link>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
}

export default Navbar;
