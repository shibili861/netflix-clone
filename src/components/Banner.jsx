import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const results = response.data.results;
        // Pick one random movie from the results array
        const randomMovie = results[Math.floor(Math.random() * results.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error('Error fetching banner movie:', error);
      }
    }
    fetchData();
  }, []);

  // Helper to truncate long descriptions
  const truncate = (text, maxLength) => {
    return text?.length > maxLength ? text.substring(0, maxLength - 1) + '...' : text;
  };

  if (!movie) return null;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
       
        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;