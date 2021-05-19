import React from 'react';
import Card from '../Card'

const Recommend = ({ recommend, media_type, btn, handleShowMore, isShow }) => {
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
                if (!recommended.poster_path) {
                  return null;
                }
                return <Card movie={recommended} movieBackdrop={movieBackdrop} key={recommended.id} prev='recommended' />
              })}
            </div>
            {btn ?
              <h4
                className="card-title hover-effect similar-btn"
                onClick={() => handleShowMore("recommended")}
              >See more Recommended {isShow ? "Shows" : "Movies"}.</h4>
              :
              null
            }
          </div>
        </div >
        : null}
    </React.Fragment>
  )
}

export default Recommend;
