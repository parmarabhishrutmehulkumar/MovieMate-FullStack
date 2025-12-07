import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h4>Questions? Contact us.</h4>
        
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        </div>

        <div className="footer-links">
          <Link to="/about">FAQ</Link>
          <Link to="/service">Help Center</Link>
          <Link to="/about">Account</Link>
          <Link to="/about">Media Center</Link>
          <Link to="/about">Investor Relations</Link>
          <Link to="/about">Jobs</Link>
          <Link to="/about">Ways to Watch</Link>
          <Link to="/about">Terms of Use</Link>
          <Link to="/about">Privacy</Link>
          <Link to="/service">Cookie Preferences</Link>
          <Link to="/about">Corporate Information</Link>
          <Link to="/service">Contact Us</Link>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MovieMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
