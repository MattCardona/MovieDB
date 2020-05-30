import React from 'react';
import Card from './Card'

const Similar = props => {
  return (
    <React.Fragment>
      {props.similar.length ?
        <div className="container-fluid similar">

          <div className="container">
            <h2>Similar</h2>
            <hr />
            <div className="row">
              {props.similar.map(simMovie => {
                const movieBackdrop = `https://image.tmdb.org/t/p/w300${simMovie.poster_path}`;
                return <Card movie={simMovie} movieBackdrop={movieBackdrop} key={simMovie.id} prev='similar' />
              })}
            </div>
          </div>
        </div >
        : null}
    </React.Fragment>
  )
}

export default Similar
