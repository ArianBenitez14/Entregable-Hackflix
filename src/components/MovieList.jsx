import React from 'react';
import MovieCard from './MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const MovieList = ({ movies, page }) => {
  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        next={() => page((prev) => prev + 1)}
      >
        {
          <div className="row no-gutters">
            {movies.map((movie) => (
              <div className="col-3  mb-4" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        }
      </InfiniteScroll>
    </>
  );
};

export default MovieList;
