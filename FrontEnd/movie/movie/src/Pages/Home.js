import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeroSection from "../Components/HeroSection";
import MovieRow from "../Components/MovieRow";
import MovieModal from "../Components/MovieModal";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);

  const apiKey = "d147107f102b8d03e41507c2503fa69e";

  useEffect(() => {
    fetchTrendingMovies();
    fetchTopRated();
    fetchByGenre(28, setActionMovies);
    fetchByGenre(35, setComedyMovies);
    fetchByGenre(27, setHorrorMovies);
    loadRecentlyViewed();
    loadContinueWatching();

    // Keyboard shortcuts
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
      if (e.key === '/' && !isModalOpen) {
        e.preventDefault();
        document.querySelector('.search-trigger')?.click();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen]);

  const loadRecentlyViewed = () => {
    const history = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    setRecentlyViewed(history.slice(0, 20));
  };

  const loadContinueWatching = () => {
    const history = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    const recent = history.filter(m => {
      const watchedDate = new Date(m.watchedAt);
      const daysSince = (Date.now() - watchedDate) / (1000 * 60 * 60 * 24);
      return daysSince < 7;
    });
    setContinueWatching(recent.slice(0, 10));
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

  const fetchTopRated = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
      );
      const data = await response.json();
      setTopRated(data.results || []);
    } catch (error) {
      console.error("Error fetching top rated:", error);
    }
  };

  const fetchByGenre = async (genreId, setter) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
      );
      const data = await response.json();
      setter(data.results || []);
    } catch (error) {
      console.error(`Error fetching genre ${genreId}:`, error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleFilter = async (filters) => {
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
      if (filters.genre) url += `&with_genres=${filters.genre}`;
      if (filters.year) url += `&primary_release_year=${filters.year}`;
      if (filters.rating) url += `&vote_average.gte=${filters.rating}`;

      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error filtering:", error);
    }
  };

  const handleRecommend = async (movieName) => {
    try {
      const resp = await fetch("http://localhost:4000/api1/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieName }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setRecommendations(data.recommendations || []);
      }
    } catch (err) {
      console.error("Recommendation error:", err);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    loadRecentlyViewed();
    loadContinueWatching();
  };

  return (
    <div className="home-netflix">
      <Navbar onSearch={handleSearch} onRecommend={handleRecommend} onFilter={handleFilter} />
      
      {trendingMovies.length > 0 && (
        <HeroSection movies={trendingMovies.slice(0, 5)} onMovieClick={handleMovieClick} />
      )}

      <div className="home-content">
        {continueWatching.length > 0 && (
          <MovieRow title="Continue Watching" movies={continueWatching} onMovieClick={handleMovieClick} />
        )}

        {searchResults.length > 0 && (
          <MovieRow title="Search Results" movies={searchResults} onMovieClick={handleMovieClick} />
        )}

        {recommendations.length > 0 && (
          <MovieRow title="Recommended For You" movies={recommendations} onMovieClick={handleMovieClick} />
        )}

        {recentlyViewed.length > 0 && (
          <MovieRow title="Recently Viewed" movies={recentlyViewed} onMovieClick={handleMovieClick} />
        )}

        <MovieRow title="Trending Now" movies={trendingMovies} onMovieClick={handleMovieClick} />
        <MovieRow title="Top Rated" movies={topRated} onMovieClick={handleMovieClick} />
        <MovieRow title="Action Movies" movies={actionMovies} onMovieClick={handleMovieClick} />
        <MovieRow title="Comedy Movies" movies={comedyMovies} onMovieClick={handleMovieClick} />
        <MovieRow title="Horror Movies" movies={horrorMovies} onMovieClick={handleMovieClick} />
      </div>

      <Footer />

      <MovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={selectedMovie}
        apiKey={apiKey}
      />

      <div className="keyboard-shortcuts-hint">
        Press <kbd>/</kbd> to search • <kbd>Esc</kbd> to close
      </div>
    </div>
  );
};

export default Home;
