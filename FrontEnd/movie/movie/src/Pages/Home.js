import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Modal from "react-modal";

const Home = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [englishMovies, setEnglishMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [error, setError] = useState(""); 

  const apiKey = "d147107f102b8d03e41507c2503fa69e";

  useEffect(() => {
    fetchTrendingMovies();
    fetchEnglishMovies();
  }, []);

  const fetchRecommendations = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a movie name to get recommendations.");
      return;
    }

    try {
      const resp = await fetch("http://localhost:4000/api1/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieName: searchQuery }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setRecommendations(data.recommendations || []);
        setError("");
      } else {
        setError(data.error || "Failed to get recommendations");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Make sure backend + ML services are running.");
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
      );
      const data = await response.json();
      setTrendingMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchEnglishMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_original_language=en`
      );
      const data = await response.json();
      setEnglishMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching English movies:", error);
    }
  };

  const handleMovieClick = async (movie) => {
    try {
      const movieId = movie.id;

      const [detailsRes, creditsRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`),
      ]);

      const detailsData = await detailsRes.json();
      const creditsData = await creditsRes.json();

      setMovieDetails({
        ...detailsData,
        cast: creditsData.cast.slice(0, 5),
        crew: creditsData.crew.filter(
          (member) => member.job === "Director" || member.job === "Writer"
        ),
      });

      setSelectedMovie(movie);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  Modal.setAppElement("#root");

  return (
    <div>
      <Navbar />

      <div className="home-container">
        {/* Search Bar Section */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter a movie name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={fetchRecommendations} className="recommend-button">
            Recommend
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}

        {/* Recommended Movies Section */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="home-heading">Recommended Movies</h2>
            <div className="movie-list">
              {recommendations.map((movie, index) => (
                <div
                  className="movie-card"
                  key={index}
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p className="movie-title">{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending Movies Section */}
        <h2 className="home-heading">Trending Movies</h2>
        <div className="movie-list">
          {trendingMovies.length > 0 ? (
            trendingMovies.map((movie, index) => (
              <div
                className="movie-card"
                key={index}
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <p className="movie-title">{movie.title}</p>
              </div>
            ))
          ) : (
            <p>Loading trending movies...</p>
          )}
        </div>

        {/* English Movies Section */}
        <h2 className="home-heading">Popular English Movies</h2>
        <div className="movie-list">
          {englishMovies.length > 0 ? (
            englishMovies.map((movie, index) => (
              <div
                className="movie-card"
                key={index}
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <p className="movie-title">{movie.title}</p>
              </div>
            ))
          ) : (
            <p>Loading English movies...</p>
          )}
        </div>
      </div>

      {/* Modal for Movie Details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Movie Details"
        className="movie-modal"
        overlayClassName="modal-overlay"
      >
        {movieDetails && (
          <div>
            <h2>{movieDetails.title}</h2>
            <p><strong>Overview:</strong> {movieDetails.overview}</p>
            <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
            <p><strong>Rating:</strong> {movieDetails.vote_average}</p>

            <h3>Cast:</h3>
            <ul>
              {movieDetails.cast.map((actor) => (
                <li key={actor.cast_id}>
                  {actor.name} as {actor.character}
                </li>
              ))}
            </ul>

            <h3>Crew:</h3>
            <ul>
              {movieDetails.crew.map((member, i) => (
                <li key={i}>
                  {member.name} - {member.job}
                </li>
              ))}
            </ul>

            <button onClick={() => setIsModalOpen(false)} className="close-modal-button">
              Close
            </button>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
};

export default Home;