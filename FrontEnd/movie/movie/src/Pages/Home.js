import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Components/Mlist.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";


// Trending movies mock array
const mockTrending = [
  "Inception",
  "The Dark Knight",
  "Interstellar",
  "Avatar",
  "Joker",
  "Parasite",
];

function Home() {
  const [movieName, setMovieName] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const apiKey = "d147107f102b8d03e41507c2503fa69e"; // Replace with your TMDB API Key
  

  // Fetch trending movie posters when the component mounts
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const moviePromises = mockTrending.map((movie) =>
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie)}`
        )
          .then((response) => response.json())
          .then((data) => data.results[0]) // Get the first result
      );

      try {
        const movieResults = await Promise.all(moviePromises);
        setTrendingMovies(movieResults);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Failed to fetch trending movies.");
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleRecommendClick = async () => {
    if (!movieName) {
      alert("Please enter a movie name");
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const movieRecommendations = data.results.slice(0, 5);
        setRecommendations(movieRecommendations);
        setError("");
      } else {
        setError("No recommendations found.");
        setRecommendations([]);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to fetch data. Please try again.");
    }
  };

  return (
    <div
      className="home-page"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/458105777/photo/many-dvds-are-arranged-side-by-side-on-the-floor.jpg?s=612x612&w=0&k=20&c=wkfgpWf3qBNeooebtU3Qurkyg6HnYFhaunffwbwAvOs=')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Your Personal Movie Universe 🎬
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Browse trending titles and get recommendations tailored to your taste.
          </motion.p>

          <div className="input-area">
            <input
              type="text"
              placeholder="Enter movie name..."
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              className="movie-input"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRecommendClick}
              className="recommend-button"
            >
              Recommend
            </motion.button>
          </div>

          {error && <p className="error-text">{error}</p>}
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="slider-section trending">
        <h2 className="section-title">Trending Now</h2>
        <div className="movie-slider">
          {trendingMovies.length > 0 ? (
            trendingMovies.map((movie, index) => (
              <motion.div
                className="movie-card"
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link to="/movie-details">
                  <div className="movie-poster">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-img"
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/200x300?text=No+Image"
                        alt={movie.title}
                        className="movie-img"
                      />
                    )}
                  </div>
                  <p className="movie-title">{movie.title}</p>
                </Link>
              </motion.div>
            ))
          ) : (
            <p>Loading trending movies...</p>
          )}
        </div>
      </section>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section className="slider-section recommended">
          <h2 className="section-title">Recommended For You</h2>
          <div className="movie-slider">
            {recommendations.map((movie, index) => (
              <motion.div
                className="movie-card"
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="movie-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-img"
                  />
                </div>
                <p className="movie-title">{movie.title}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default Home;