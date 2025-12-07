import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiEdit2, FiSave, FiX } from "react-icons/fi";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    const parsed = JSON.parse(userData);
    setUser(parsed);
    setFormData(parsed);

    const liked = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    setLikedMovies(liked);

    const list = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(list);

    const history = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    setWatchHistory(history);
  }, [navigate]);

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const getInitials = (name) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";
  };

  const removeLikedMovie = (movieId) => {
    const updated = likedMovies.filter(m => m.id !== movieId);
    setLikedMovies(updated);
    localStorage.setItem('likedMovies', JSON.stringify(updated));
  };

  const removeFromWatchlist = (movieId) => {
    const updated = watchlist.filter(m => m.id !== movieId);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-header-section">
            <div className="profile-avatar-xl">
              {getInitials(user.name)}
            </div>
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
          </div>

          <div className="profile-content">
            <div className="profile-section-header">
              <h2>Account Information</h2>
              {!isEditing ? (
                <button
                  className="btn-edit"
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit profile"
                >
                  <FiEdit2 /> Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button
                    className="btn-save"
                    onClick={handleSave}
                    aria-label="Save changes"
                  >
                    <FiSave /> Save
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={handleCancel}
                    aria-label="Cancel editing"
                  >
                    <FiX /> Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="name">
                  <FiUser /> Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  aria-label="Full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FiMail /> Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  aria-label="Email address"
                />
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-card">
                <h3>{watchHistory.length}</h3>
                <p>Movies Watched</p>
              </div>
              <div className="stat-card">
                <h3>{likedMovies.length}</h3>
                <p>Favorites</p>
              </div>
              <div className="stat-card">
                <h3>{watchlist.length}</h3>
                <p>Watchlist</p>
              </div>
            </div>

            {watchlist.length > 0 && (
              <div className="liked-movies-section">
                <h2>My Watchlist</h2>
                <div className="liked-movies-grid">
                  {watchlist.map((movie) => (
                    <div key={movie.id} className="liked-movie-card">
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path || movie.backdrop_path}`}
                        alt={movie.title}
                      />
                      <div className="liked-movie-info">
                        <h4>{movie.title}</h4>
                        <p>{movie.vote_average?.toFixed(1)} ★</p>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromWatchlist(movie.id)}
                        aria-label={`Remove ${movie.title}`}
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {likedMovies.length > 0 && (
              <div className="liked-movies-section">
                <h2>Your Favorite Movies</h2>
                <div className="liked-movies-grid">
                  {likedMovies.map((movie) => (
                    <div key={movie.id} className="liked-movie-card">
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path || movie.backdrop_path}`}
                        alt={movie.title}
                      />
                      <div className="liked-movie-info">
                        <h4>{movie.title}</h4>
                        <p>{movie.vote_average?.toFixed(1)} ★</p>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeLikedMovie(movie.id)}
                        aria-label={`Remove ${movie.title}`}
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
