// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovie = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setMovie(null);
    
    try {
      const API_KEY = 'a6021f2a'; // OMDb API key
      const response = await axios.get(`https://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`);
      
      if (response.data.Response === 'True') {
        setMovie(response.data);
        console.log("Movie found")
      } else {
        setError('Movie not found. Please try another title.');
        console.log("Movie not found")
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.log("Fetching Error")
    }
    
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovie();
  };

  return (
    <div className="app">
      <h1>MovieScout</h1>
      <h2>Uncover Hidden Gems in the Movie World</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {movie && (
        <div className="movie">
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} alt={movie.Title} />
          <h2><strong>Rating:</strong> {movie.imdbRating}</h2>
          <h2><strong>Plot:</strong></h2><h4>{movie.Plot}</h4> 
        </div>
      )}
    </div>
  );
};

export default App;
