import React from "react";
import { motion } from "framer-motion";
import "./About.css";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <section className="about-hero">
        <h1>About MovieMate</h1>
        <p>Your ultimate destination for discovering movies tailored to your taste.</p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At MovieMate, we aim to revolutionize the way you explore and enjoy movies. 
          Our platform leverages cutting-edge technology to provide personalized recommendations, 
          ensuring you never miss a movie you'll love.
        </p>
      </section>

      <section className="about-section">
        <h2>Features</h2>
        <ul>
          <li>🎥 Personalized movie recommendations</li>
          <li>📈 Trending movies updated daily</li>
          <li>🔍 Search for your favorite movies</li>
          <li>🌟 User-friendly interface</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? We'd love to hear from you! Reach out to us at:
        </p>
        <p>Email: <a href="mailto:support@moviemate.com">support@moviemate.com</a></p>
        <p>Phone: +1 (123) 456-7890</p>
      </section>
      <Footer />
    </motion.div>
  );
};

export default About;