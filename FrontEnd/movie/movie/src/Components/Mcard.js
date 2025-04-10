import React from "react";
import { motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import "./Mcard.css";

function Mcard({ movie }) {
  return (
    <motion.div
      className="movie-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <img src={movie.image} alt={movie.title} className="movie-image" />
      <div className="movie-info">
        <h3>
          <FaPlayCircle style={{ marginRight: "8px", color: "#f1356d" }} />
          {movie.title}
        </h3>
        <p className="genre">{movie.genre}</p>
      </div>
    </motion.div>
  );
}

export default Mcard;
