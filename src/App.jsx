import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList.jsx';
import moviesData from './data/movies.json';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  return (
    <div className="container">
      <header>
        <h1 className="text-center">Hackflix</h1>
      </header>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
