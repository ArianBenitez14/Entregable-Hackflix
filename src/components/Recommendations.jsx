import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import recommendations from '../data/recommendations.json';

function Recommendations() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    setRecommendedMovies(recommendations);
  }, []);

  if (recommendedMovies.length === 0) {
    return <p>Cargando películas recomendadas...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Películas Recomendadas</h2>
      <div className="row">
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
