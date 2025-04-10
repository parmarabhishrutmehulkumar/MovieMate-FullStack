import React, { useState } from "react";
import Mcard from "./Mcard";
import "./Mlist.css";

function Mlist() {
  const [searchQuery, setSearchQuery] = useState("");
  const movies = [
    { title: "Inception", genre: "Sci-Fi", image: "https://via.placeholder.com/200x300" },
    { title: "The Dark Knight", genre: "Action", image: "https://via.placeholder.com/200x300" },
    { title: "Titanic", genre: "Romance", image: "https://via.placeholder.com/200x300" },
    // Add more movies as needed
  ];

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery) ||
      movie.genre.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="movie-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies by name, genre..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="movie-list">
        {filteredMovies.map((movie, index) => (
          <Mcard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Mlist;
