import React from 'react';
import './Card.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card card hover-effect col-3">
      {
        <img
          className="card-img-top object-fit"
          src={movie.poster_path}
          alt={movie.title}
        />
      }
    </div>
  );
};

export default MovieCard;
