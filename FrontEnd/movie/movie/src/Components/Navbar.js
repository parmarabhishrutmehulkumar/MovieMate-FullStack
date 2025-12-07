import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiBell } from "react-icons/fi";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";
import "./Navbar.css";

function Navbar({ onSearch, onRecommend }) {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar-netflix ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-left">
        <Link to="/home" className="navbar-logo" aria-label="MovieMate home">
          MOVIEMATE
        </Link>
        <ul className={isMobile ? "navbar-links-mobile" : "navbar-links"} role="menubar">
          <li role="none">
            <Link to="/home" role="menuitem">Home</Link>
          </li>
          <li role="none">
            <Link to="/about" role="menuitem">About</Link>
          </li>
          <li role="none">
            <Link to="/service" role="menuitem">Help</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <SearchBar onSearch={onSearch} onRecommend={onRecommend} />
        <button 
          className="navbar-icon-btn" 
          aria-label="Notifications"
        >
          <FiBell className="navbar-icon" />
        </button>
        <ProfileDropdown />
        <button 
          className="menu-icon" 
          onClick={() => setIsMobile(!isMobile)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobile}
        >
          {isMobile ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </motion.nav>
  );
}

export default Navbar;
