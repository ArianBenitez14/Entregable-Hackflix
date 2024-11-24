import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recommendations from '../data/recommendations.json'; 
function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const isRecommendation = recommendations.some((rec) => rec.id === id); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (isRecommendation) {
       
        const recommendedMovie = recommendations.find((rec) => rec.id === id);
        setMovie(recommendedMovie); 
      } else {
        
        const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=8bf671b37acf42e92c1ce6bc24023aa6`;
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setMovie(data); 
        } catch (error) {
          console.error('Error al cargar los detalles: ', error);
        }
      }
    };

    fetchMovieDetails();
  }, [id, isRecommendation]); 

  if (!movie) {
    return <p>Cargando detalles de la película...</p>;
  }

  return (
    <div className="movie-details card movie-card w-50 text-center">
      <div className="card-title detail-card-title">
        <strong>{movie.original_title || movie.title}</strong> 
      </div>
      <img
        className="card-img-top w-50"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.original_title}
      />
      <div className="card-body">{movie.overview}</div> 
      <ul className="list-unstyled">
        <li>
          <strong>Rating:</strong> {movie.vote_average}
        </li>
        <li>
          <strong>Fecha de estreno:</strong> {movie.release_date || movie.release_date} 
        </li>
      </ul>
      <button
        className="btn btn-danger mb-4 home-btn"
        onClick={() => navigate('/')}
      >
        <strong> Volver al inicio</strong>
      </button>
    </div>
  );
}

export default MovieDetails;
