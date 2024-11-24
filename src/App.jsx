import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import './App.css';
import { Rating } from 'react-simple-star-rating';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import Recommendations from './components/Recommendations';
import SearchPage from './components/SearchPage';  
import NotFound from './components/NotFound';

function App() {
  const [movies, setMovies] = useState([]); 
  const [displayMovies, setDisplayMovies] = useState([]); 
  const [selectedGenre, setSelectedGenre] = useState(''); 
  const [rating, setRating] = useState(0); 
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const [sortOrder, setSortOrder] = useState('');

  const API_KEY = '8bf671b37acf42e92c1ce6bc24023aa6';
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&sort_by=popularity.desc&vote_count.gte=40`;

  const fetchMovies = async (page, genre = '', order = 'popularity.desc') => {
    try {
      const url = genre
        ? `${API_URL}&page=${page}&with_genres=${genre}&vote_average.gte=${rating}&sort_by=${order}`
        : `${API_URL}&page=${page}&vote_average.gte=${rating}&sort_by=${order}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error al cargar las películas: ', error);
      return [];
    }
  };

 
  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setMovies([]);  
    setPage(1);     
    setHasMore(true);  
  };

 
  const handleRating = (rate) => {
    const newRating = rate * 2 - 2; 
    setRating(newRating);
    setMovies([]);  
    setPage(1);    
    setHasMore(true);  
  };

  
  const loadMoreMovies = async () => {
    if (!hasMore) return;
    const newMovies = await fetchMovies(page, selectedGenre, sortOrder);
    if (newMovies.length > 0) {
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setDisplayMovies((prevDisplayMovies) => [...prevDisplayMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      const initialMovies = await fetchMovies(page, selectedGenre);
      setMovies(initialMovies);
      setDisplayMovies(initialMovies);
    };

    loadMovies();
  }, [selectedGenre, rating, page]); 

  return (
    <Router>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <header className="fixed-top w-100">
          <nav className="topbar navbar fixed-top bg-opacity-50">
            <div className="container-fluid gap-2">
              <button
                className="color-buttons"
                onClick={() => window.location.assign('/')}
              >
                <strong className='title'>Hackflix</strong>
              </button>
              <Link to="/buscar">
                <button className="color-buttons">
                  <strong>Buscar</strong>
                </button>
              </Link>
              <button
                className="color-buttons"
                onClick={() => window.location.assign('/recomendaciones')}
              >
                <strong>Recomendaciones</strong>
              </button>

              {/* Botones de géneros */}
              <button className="color-buttons" onClick={() => handleGenreClick(28)}>
                <strong>Acción</strong>
              </button>
              <button className="color-buttons" onClick={() => handleGenreClick(878)}>
                <strong>Ciencia ficción</strong>
              </button>
              <button className="color-buttons" onClick={() => handleGenreClick(18)}>
                <strong>Drama</strong>
              </button>
              <button className="color-buttons" onClick={() => handleGenreClick(14)}>
                <strong>Fantasía</strong>
              </button>
              <button className="color-buttons" onClick={() => handleGenreClick(10749)}>
                <strong>Romance</strong>
              </button>
              <button className="color-buttons" onClick={() => handleGenreClick(27)}>
                <strong>Terror</strong>
              </button>
            </div>
          </nav>
        </header>

        <div className="banner">
          <h1 className="title-size">Hackflix</h1>
        </div>

        <Routes>
          <Route path="/buscar" element={<SearchPage />} />
          <Route
            path="/"
            element={
              <div className="m-4">
                <div className="mb-4 container-fluid topbar p-2 d-flex justify-content-between">
                  <span className="texto-rating">
                    <strong>Seleccione filtro por rating:</strong>
                  </span>
                  <span className="stars">
                    <Rating
                      onClick={handleRating}
                      size={30}
                      transition
                      allowHalfIcon
                      initialValue={0}  
                    />
                  </span>
                  <span className="texto-rating">
                    <strong>Rating actual {rating} y más... </strong>
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
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/recomendaciones" element={<Recommendations />} />
          {/* Error 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
