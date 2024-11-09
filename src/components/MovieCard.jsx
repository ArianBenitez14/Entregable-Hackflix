import React from 'react';
import './Card.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card card  hover-effect">
      <img
        className="card-img-top "
        src={movie.poster_path}
        alt={movie.title}
      />
    </div>
  );
};

export default MovieCard;
