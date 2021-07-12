import React from 'react';
import Card from '../Card'

const Similar = props => {
  const { media_type, btn, isShow } = props;

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
                simMovie.media_type = media_type;
                if (!simMovie.poster_path) {
                  return null;
                }
                return <Card movie={simMovie} movieBackdrop={movieBackdrop} key={simMovie.id} prev='similar' isShow={isShow} />
              })}
            </div>
            {!btn ?
              null
              :
              <h4 className="card-title hover-effect similar-btn"
                onClick={() => props.handleShowMore("similar")}
              >
                See More Similar {isShow ? "Shows" : "Movies"}. </h4>
            }

          </div>
        </div >
        : null}
    </React.Fragment>
  )
}

export default Similar
