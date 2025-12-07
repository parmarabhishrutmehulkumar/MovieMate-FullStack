import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaInfoCircle, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./HeroSection.css";

const HeroSection = ({ movies, onMovieClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movies.length) return null;
  const movie = movies[currentIndex];

  return (
    <div className="hero-section">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="hero-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        >
          <div className="hero-gradient" />
        </motion.div>
      </AnimatePresence>

      <div className="hero-content">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {movie.title}
        </motion.h1>

        <motion.p
          className="hero-overview"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {movie.overview?.slice(0, 200)}...
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <button className="btn-play" onClick={() => onMovieClick(movie)}>
            <FaPlay /> Play
          </button>
          <button className="btn-info" onClick={() => onMovieClick(movie)}>
            <FaInfoCircle /> More Info
          </button>
        </motion.div>

        <button className="btn-mute" onClick={() => setMuted(!muted)}>
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
