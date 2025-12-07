import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { FaTimes, FaPlay, FaPlus, FaThumbsUp, FaStar } from "react-icons/fa";
import "./MovieModal.css";

const MovieModal = ({ isOpen, onClose, movie, apiKey }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (movie && isOpen) {
      fetchDetails();
      const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
      setUserRating(ratings[movie.id] || 0);
      
      // Track watch history
      const history = JSON.parse(localStorage.getItem('watchHistory') || '[]');
      const exists = history.find(m => m.id === movie.id);
      if (!exists) {
        history.unshift({ ...movie, watchedAt: new Date().toISOString() });
        localStorage.setItem('watchHistory', JSON.stringify(history.slice(0, 50)));
      }
    }
  }, [movie, isOpen]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const [detailsRes, creditsRes, videosRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`),
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`),
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`)
      ]);

      const [detailsData, creditsData, videosData] = await Promise.all([
        detailsRes.json(),
        creditsRes.json(),
        videosRes.json()
      ]);

      setDetails({
        ...detailsData,
        cast: creditsData.cast.slice(0, 10),
        trailer: videosData.results.find(v => v.type === "Trailer")
      });
    } catch (error) {
      console.error("Error fetching details:", error);
    }
    setLoading(false);
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
    ratings[movie.id] = rating;
    localStorage.setItem('movieRatings', JSON.stringify(ratings));
  };

  if (!movie) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="movie-modal-netflix"
      overlayClassName="modal-overlay-netflix"
      closeTimeoutMS={300}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-hero">
          {details?.trailer ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${details.trailer.key}?autoplay=1&mute=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title}
            />
          )}
          <div className="modal-hero-gradient" />
          <div className="modal-hero-content">
            <h1>{movie.title}</h1>
            <div className="modal-actions">
              <button className="modal-btn play">
                <FaPlay /> Play
              </button>
              <button className="modal-btn icon">
                <FaPlus />
              </button>
              <button className="modal-btn icon">
                <FaThumbsUp />
              </button>
            </div>
          </div>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="modal-loading">Loading...</div>
          ) : details ? (
            <>
              <div className="rating-section">
                <h3>Rate this movie</h3>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star ${star <= (hoverRating || userRating) ? 'active' : ''}`}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                  {userRating > 0 && <span className="rating-text">Your rating: {userRating}/5</span>}
                </div>
              </div>

              <div className="modal-info">
                <div className="modal-main">
                  <div className="modal-meta">
                    <span className="match">{Math.round(movie.vote_average * 10)}% Match</span>
                    <span>{details.release_date?.split("-")[0]}</span>
                    <span className="runtime">{details.runtime} min</span>
                    <span className="quality">HD</span>
                  </div>
                  <p className="modal-overview">{details.overview}</p>
                </div>
                
                <div className="modal-side">
                  <p><span>Cast:</span> {details.cast.slice(0, 5).map(c => c.name).join(", ")}</p>
                  <p><span>Genres:</span> {details.genres?.map(g => g.name).join(", ")}</p>
                  <p><span>Rating:</span> {details.vote_average?.toFixed(1)}/10</p>
                </div>
              </div>

              {details.cast.length > 0 && (
                <div className="modal-cast">
                  <h3>Cast</h3>
                  <div className="cast-grid">
                    {details.cast.map((actor) => (
                      <div key={actor.id} className="cast-member">
                        {actor.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            alt={actor.name}
                          />
                        ) : (
                          <div className="cast-placeholder">{actor.name[0]}</div>
                        )}
                        <div className="cast-info">
                          <p className="cast-name">{actor.name}</p>
                          <p className="cast-character">{actor.character}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </motion.div>
    </Modal>
  );
};

export default MovieModal;
