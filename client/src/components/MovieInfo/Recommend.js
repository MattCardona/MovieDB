import React from 'react';
import Card from '../Card'

const Recommend = ({ recommend, media_type }) => {
  return (
    <React.Fragment>
      {recommend.length ?
        <div className="container-fluid recommended">

          <div className="container">
            <h2>Recommendations</h2>
            <hr />
            <div className="row">
              {recommend.map(recommended => {
                const movieBackdrop = `https://image.tmdb.org/t/p/w300${recommended.poster_path}`;
                recommended.media_type = media_type;
                return <Card movie={recommended} movieBackdrop={movieBackdrop} key={recommended.id} prev='recommended' />
              })}
            </div>
          </div>
        </div >
        : null}
    </React.Fragment>
  )
}

export default Recommend;
