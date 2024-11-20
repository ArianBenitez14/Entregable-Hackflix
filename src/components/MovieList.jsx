import React from 'react';
import MovieCard from './MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const MovieList = ({ movies, loadMoreMovies }) => {
  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={loadMoreMovies}
      hasMore={true}
      loader={<p className="text-center">Cargando más películas...</p>}
    >
      <div className="row no-gutters">
        {movies.map((movie) => (
          <div className="col-3 mb-4" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default MovieList;
