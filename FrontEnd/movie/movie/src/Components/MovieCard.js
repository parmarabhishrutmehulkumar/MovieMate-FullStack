import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown, FaStar } from "react-icons/fa";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [userRating, setUserRating] = useState(0);

  React.useEffect(() => {
    const likedMovies = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    setIsLiked(likedMovies.some(m => m.id === movie.id));

    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setIsInWatchlist(watchlist.some(m => m.id === movie.id));

    const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
    setUserRating(ratings[movie.id] || 0);
  }, [movie.id]);

  const handleLike = (e) => {
    e.stopPropagation();
    const likedMovies = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    if (!isLiked) {
      likedMovies.push(movie);
      localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
      setIsLiked(true);
    } else {
      const filtered = likedMovies.filter(m => m.id !== movie.id);
      localStorage.setItem('likedMovies', JSON.stringify(filtered));
      setIsLiked(false);
    }
  };

  const handleWatchlist = (e) => {
    e.stopPropagation();
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (!isInWatchlist) {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setIsInWatchlist(true);
    } else {
      const filtered = watchlist.filter(m => m.id !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(filtered));
      setIsInWatchlist(false);
    }
  };

  const isTrending = movie.vote_average > 7.5 && movie.vote_count > 1000;
  const isNew = new Date(movie.release_date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  return (
    <motion.div
      className="movie-card-netflix"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.08, zIndex: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {isTrending && <div className="badge trending-badge">🔥 Trending</div>}
      {isNew && <div className="badge new-badge">✨ New</div>}
      
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
        alt={movie.title}
        className="card-poster"
        loading="lazy"
      />
      
      {isHovered && (
        <motion.div
          className="card-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-info">
            <h3>{movie.title}</h3>
            <div className="card-actions">
              <button 
                className="action-btn play-btn" 
                onClick={onClick}
                aria-label={`Play ${movie.title}`}
              >
                <FaPlay />
              </button>
              <button 
                className={`action-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
                onClick={handleWatchlist}
                aria-label={`Add ${movie.title} to watchlist`}
              >
                <FaPlus />
              </button>
              <button 
                className={`action-btn ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
                aria-label={`Like ${movie.title}`}
              >
                <FaThumbsUp />
              </button>
              <button 
                className="action-btn info-btn" 
                onClick={onClick}
                aria-label={`More info about ${movie.title}`}
              >
                <FaChevronDown />
              </button>
            </div>
            <div className="card-meta">
              <span className="rating">{movie.vote_average?.toFixed(1)} ★</span>
              <span className="year">{movie.release_date?.split("-")[0]}</span>
              {userRating > 0 && <span className="user-rating"><FaStar /> {userRating}</span>}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MovieCard;
