import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from '../api/axios';

const imageBaseUrl = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  // 1. Fetch movies for this row
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  // 2. YouTube player dimensions and options
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1, // Automatically starts playing when mounted
    },
  };

  // 3. Handle poster click
  const handleClick = (movie) => {
    // If a trailer is already open, close it (toggle off)
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      // Find trailer using the movie's title or name
      const movieName = movie?.title || movie?.name || movie?.original_name || '';

      movieTrailer(movieName)
        .then((url) => {
          if (url) {
            // Converts 'https://www.youtube.com/watch?v=XtMThy8QKqU'
            // and extracts only the video ID: 'XtMThy8QKqU'
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
          } else {
            console.log('No trailer found for:', movieName);
          }
        })
        .catch((error) => console.error('Error fetching trailer:', error));
    }
  };

  return (
    <div style={{ color: 'white', marginLeft: '20px' }}>
      <h2>{title}</h2>

      {/* Movie Posters Carousel */}
      <div style={{ display: 'flex', overflowX: 'scroll', padding: '20px 0' }}>
        {movies.map((movie) => {
          const imagePath = isLargeRow ? movie.poster_path : movie.backdrop_path;
          if (!imagePath) return null;

          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              style={{
                maxHeight: isLargeRow ? '250px' : '100px',
                objectFit: 'contain',
                marginRight: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'transform 450ms',
              }}
              src={`${imageBaseUrl}${imagePath}`}
              alt={movie.name || movie.title}
            />
          );
        })}
      </div>

      {/* Conditionally render the video player */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;