import React, { useState, useEffect } from 'react';
import MovieList from './MovieList'; 
import { useLocation } from 'react-router-dom';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayMovies, setDisplayMovies] = useState([]);
  
  const API_KEY = '8bf671b37acf42e92c1ce6bc24023aa6';

  const searchMovies = async (query) => {
    try {
      if (!query) {
        setDisplayMovies([]);
        return;
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setDisplayMovies(data.results);
    } catch (error) {
      console.error('Error al buscar películas: ', error);
    }
  };

  useEffect(() => {
    searchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <div className="m-4 justify-content-center">
      <div className="container mt-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control search-bar" 
          placeholder="Buscar película..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-3">
        {displayMovies.length > 0 ? (
          <MovieList movies={displayMovies} />
        ) : (
          <p className="text-center">Lo sentimos, no se encontraron películas con el título buscado</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
