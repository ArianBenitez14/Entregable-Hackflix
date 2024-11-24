import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import recommendations from '../data/recommendations.json';

function Recommendations() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState('year_desc');


  const sortMovies = (movies, order) => {
    return [...movies].sort((a, b) => {
      const yearA = new Date(a.release_date).getFullYear();
      const yearB = new Date(b.release_date).getFullYear();

      if (order === 'year_desc') {
        return yearB - yearA; // De más nuevo a más viejo
      } else {
        return yearA - yearB; // De más viejo a más nuevo
      }
    });
  };

  useEffect(() => {
  
    const sortedMovies = sortMovies(recommendations, sortOrder);
    setRecommendedMovies(sortedMovies);
  }, [sortOrder]); 

  
  const handleSortOrderChange = (e) => {
    const newOrder = e.target.value;
    setSortOrder(newOrder);
  };

  if (recommendedMovies.length === 0) {
    return <p>Cargando películas recomendadas...</p>;
  }

  return (
    <div className="container row no-gutters" >
      <h2 className="text-center mb-4">Películas Recomendadas</h2>

      <div className="mb-4 row no-gutters">
        <label htmlFor="sortOrder" className="me-2">Ordenar por año: </label>
        <select 
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="form-select"
        >
          <option value="year_desc">Más nuevo a más viejo</option>
          <option value="year_asc">Más viejo a más nuevo</option>
        </select>
      </div>

      <div className="row no-gutters">
        {recommendedMovies.map((movie) => (
          <div className="col-3 mb-4" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
