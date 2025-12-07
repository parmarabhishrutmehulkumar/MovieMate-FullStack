import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ onSearch, onRecommend, onFilter }) => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    rating: ""
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setIsExpanded(false);
    }
  };

  const handleRecommend = () => {
    if (query.trim()) {
      onRecommend(query);
      setQuery("");
      setIsExpanded(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilter) onFilter(newFilters);
  };

  return (
    <div className="search-bar-netflix">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            className="search-expanded"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSearch} className="search-form">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="filter-btn"
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Toggle filters"
              >
                <FaFilter />
              </button>
              <button
                type="button"
                className="search-close"
                onClick={() => {
                  setIsExpanded(false);
                  setQuery("");
                  setShowFilters(false);
                }}
              >
                <FaTimes />
              </button>
            </form>

            {showFilters && (
              <motion.div
                className="filters-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <select
                  value={filters.genre}
                  onChange={(e) => handleFilterChange("genre", e.target.value)}
                >
                  <option value="">All Genres</option>
                  <option value="28">Action</option>
                  <option value="35">Comedy</option>
                  <option value="18">Drama</option>
                  <option value="27">Horror</option>
                  <option value="10749">Romance</option>
                  <option value="878">Sci-Fi</option>
                </select>

                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                >
                  <option value="">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>

                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                >
                  <option value="">All Ratings</option>
                  <option value="9">9+ Stars</option>
                  <option value="8">8+ Stars</option>
                  <option value="7">7+ Stars</option>
                  <option value="6">6+ Stars</option>
                </select>
              </motion.div>
            )}

            {query && (
              <button
                type="button"
                className="recommend-btn-small"
                onClick={handleRecommend}
              >
                Get Recommendations
              </button>
            )}
          </motion.div>
        ) : (
          <motion.button
            className="search-trigger"
            onClick={() => setIsExpanded(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSearch />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
