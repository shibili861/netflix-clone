import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import Footer from '../components/Footer';
import requests from '../api/requests';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#111', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. Fixed top navigation bar */}
      <Navbar />

      {/* 2. Hero banner showing a random featured movie */}
      <Banner />

      {/* 3. Category rows fetching movies from TMDB */}
      <Row 
        title="NETFLIX ORIGINALS" 
        fetchUrl={requests.fetchNetflixOriginals} 
        isLargeRow={true} 
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />

      <Footer />
    </div>
  );
};

export default Home;