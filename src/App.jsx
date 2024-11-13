import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=8bf671b37acf42e92c1ce6bc24023aa6&include_adult=false&page=1&sort_by=popularity.desc&vote_count.gte=40'
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('no estan las pelis : ', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <header className="banner">
        <h1 className="">Hackflix</h1>
      </header>
      <div className="m-5">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
