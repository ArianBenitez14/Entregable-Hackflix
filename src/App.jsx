import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import moviesData from './data/movies.json';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center">
      <header>
        <h1 className="text-center">Hack flix</h1>
      </header>
      <div className="m-5">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
