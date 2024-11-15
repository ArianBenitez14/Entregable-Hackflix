import React from "react";
import "./Card.css";

const MovieCard = ({ movie }) => {
  const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <div className="movie-card card hover-effect">
      <img className="card-img-top" src={imgUrl} alt={movie.title} />
    </div>
  );
};

export default MovieCard;
