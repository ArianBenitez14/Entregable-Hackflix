import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const MovieList = ({ loadMoreMovies, hasMore, movies }) => {
  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={loadMoreMovies} 
      hasMore={hasMore}
      loader={<p className="text-center">Cargando más películas...</p>}
      endMessage={<p className="text-center">¡No hay más películas!</p>} 
    >
      <div className="row no-gutters">
        {movies.map((movie) => (
          <div className="col-3 mb-4" key={movie.id}>
            <Link
              to={`/movie/${movie.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default MovieList;
