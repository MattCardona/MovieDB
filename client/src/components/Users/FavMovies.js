import React from 'react'
import Card from '../Card';

const FavMovies = ({ movies }) => {
  return (
    <div id="user-fav-movies" className="row">
      {movies.map(movie => {
        if (!movie.posterPath) {
          return null;
        }
        return (
          <Card movie={movie} movieBackdrop={movie.backdropPath} prev="userprofile" key={movie.movieId} />
        )
      })}
    </div>
  )
}

export default FavMovies;