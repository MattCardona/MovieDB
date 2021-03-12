import React from 'react'
import Card from '../Card';

const FavShows = ({ shows }) => {
  return (
    <div id="user-fav-shows" className="row">
      {shows.map(show => {
        if (!show.posterPath) {
          return null;
        }
        return (
          <Card movie={show} movieBackdrop={show.backdropPath} prev="userprofile" key={show.showId} />
        )
      })}
    </div>
  )
}

export default FavShows;