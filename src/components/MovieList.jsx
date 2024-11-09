import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  return (
    <div className="row no-gutters">
      {movies.map((movie) => (
        <div className="col-12 col-md-4 mb-4" key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
