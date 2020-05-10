import React from 'react';
import { Link } from 'react-router-dom';

const Card = props => {
  let { title, id, name, media_type } = props.movie;
  let { movieBackdrop, prev } = props;
  let path = media_type === "tv" ? `/tv/${id}` : `/movie/${id}`;
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <Link
        to={{
          pathname: path,
          state: { prev: prev }
        }}
      >
        <div className="card">
          <img className="card-image" src={movieBackdrop} alt="" />
          <h4 className="card-title hover-effect">
            {title || name}
          </h4>
        </div>

      </Link>
    </div>
  )
}

export default Card;