import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  /*useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?api_key=8bf671b37acf42e92c1ce6bc24023aa6&include_adult=false&page=1&sort_by=popularity.desc&vote_count.gte=40"
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("no estan las pelis : ", error);
      }
    };
    fetchMovies();
  }, []);*/

  const fetchMovies = async (genre = "") => {
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=8bf671b37acf42e92c1ce6bc24023aa6&include_adult=false&page=1&sort_by=popularity.desc&vote_count.gte=40`;

      if (genre) {
        url += `&with_genres=${genre}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("No se encontraron las películas: ", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    fetchMovies(genreId);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <header className="fixed-top w-100">
        <nav className="topbar navbar fixed-top bg-opacity-50">
          <div className="container-fluid gap-2">
            <button
              className="color-buttons"
              onClick={() => handleGenreClick(28)}
            >
              <strong>Acción</strong>
            </button>
            <button
              className="color-buttons"
              onClick={() => handleGenreClick(878)}
            >
              <strong>Ciencia ficción</strong>
            </button>
            <button
              className="color-buttons"
              onClick={() => handleGenreClick(18)}
            >
              <strong>Drama</strong>
            </button>
            <button
              className="color-buttons"
              onClick={() => handleGenreClick(14)}
            >
              <strong>Fantasía</strong>
            </button>
            <button
              className="color-buttons"
              onClick={() => handleGenreClick(10749)}
            >
              <strong>Romance</strong>
            </button>
            <button
              className="color-buttons"
              onClick={() => handleGenreClick(27)}
            >
              <strong>Terror</strong>
            </button>
          </div>
        </nav>
      </header>
      <div className="banner">
        <h1 className="title-size">Hackflix</h1>
      </div>
      <div className="m-5 cards-div">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
