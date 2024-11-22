import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const MovieCard = ({ movie }) => {
  const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
      <div className="movie-card card hover-effect">
        <img className="card-img-top" src={imgUrl} alt={movie.title} />
      </div>
    </Link>
  );
};

export default MovieCard;
