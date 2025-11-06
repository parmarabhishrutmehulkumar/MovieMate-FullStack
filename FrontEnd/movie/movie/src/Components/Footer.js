import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  // Replace these with your actual social media URLs
  const facebookUrl = "YOUR_FACEBOOK_URL";
  const twitterUrl = "YOUR_TWITTER_URL";
  const instagramUrl = "YOUR_INSTAGRAM_URL";
  const linkedinUrl = "YOUR_LINKEDIN_URL";

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer-container">
        <div className="footer-section brand">
          <motion.h3 whileHover={{ scale: 1.05 }}>MovieMate</motion.h3>
          <p>Discover movies tailored to your taste.</p>
        </div>

        <div className="footer-section links">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/service">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section socials">
          <h4>Connect</h4>
          <div className="social-icons">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MovieMate | All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;