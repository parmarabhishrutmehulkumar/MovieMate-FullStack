import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";
import "./MovieRow.css";

const MovieRow = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (direction) => {
    const { current } = rowRef;
    const scrollAmount = current.offsetWidth * 0.9;
    
    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    setTimeout(() => {
      setShowLeft(current.scrollLeft > 0);
      setShowRight(current.scrollLeft < current.scrollWidth - current.offsetWidth - 10);
    }, 300);
  };

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        {showLeft && (
          <button 
            className="scroll-btn left" 
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
        )}
        
        <motion.div
          ref={rowRef}
          className="row-posters"
          onScroll={(e) => {
            setShowLeft(e.target.scrollLeft > 0);
            setShowRight(e.target.scrollLeft < e.target.scrollWidth - e.target.offsetWidth - 10);
          }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id || index}
              movie={movie}
              onClick={() => onMovieClick(movie)}
              index={index}
            />
          ))}
        </motion.div>

        {showRight && (
          <button 
            className="scroll-btn right" 
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;
