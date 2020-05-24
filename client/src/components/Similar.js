import React from 'react';
import Card from './Card'

const Similar = props => {
  return (
    <div className="row">
      {props.similar.map(simMovie => {
        const movieBackdrop = `https://image.tmdb.org/t/p/w300${simMovie.poster_path}`;
        return <Card movie={simMovie} movieBackdrop={movieBackdrop} key={simMovie.id} prev="home" />
      })}
    </div>
  )
}

export default Similar
