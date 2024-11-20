import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import './App.css';
import { Rating } from 'react-simple-star-rating';

function App() {
  const [movies, setMovies] = useState([]);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=8bf671b37acf42e92c1ce6bc24023aa6&include_adult=false&sort_by=popularity.desc&vote_count.gte=40`;

  const fetchMovies = async (page, genre = '') => {
    try {
      const url = genre
        ? `${API_URL}&page=${page}&with_genres=${genre}`
        : `${API_URL}&page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error al cargar las películas: ', error);
      return [];
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      const newMovies = await fetchMovies(page, selectedGenre);

      if (newMovies.length === 0) {
        setHasMore(false);
        return;
      }

      setMovies((prevMovies) => {
        const movieIds = prevMovies.map((movie) => movie.id);
        const uniqueMovies = newMovies.filter(
          (movie) => !movieIds.includes(movie.id)
        );
        return [...prevMovies, ...uniqueMovies];
      });
    };

    loadMovies();
  }, [page, selectedGenre]);

  const applyFilters = () => {
    let filtered = [...movies];

    if (selectedGenre) {
      filtered = filtered.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }

    if (rating > 0) {
      const minRating = rating / 2;
      filtered = filtered.filter((movie) => movie.vote_average >= minRating);
    }

    setDisplayMovies(filtered);
  };

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  useEffect(() => {
    applyFilters();
  }, [movies, selectedGenre, rating]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
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

      <div className="m-5">
        <div className="mb-4 container-fluid topbar p-2">
          <span className="texto-rating align-middle">
            Seleccione para filtrar por rating deseado:
          </span>
          <span className="align-middle">
            <Rating
              onClick={handleRating}
              size={30}
              transition
              allowHalfIcon
              initialValue={0}
            />
          </span>
        </div>
        {displayMovies.length > 0 ? (
          <MovieList
            movies={displayMovies}
            loadMoreMovies={loadMoreMovies}
            hasMore={hasMore}
          />
        ) : (
          <p className="text-center">
            Lo sentimos, no se encontraron películas con los filtros aplicados.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
