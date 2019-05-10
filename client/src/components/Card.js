import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
  let {title, id} = props.movie;
  let {movieBackdrop, prev} = props;
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <Link 
        to={{
        pathname: `/movie/${id}`,
        state: { prev: prev }
        }}
      >
        <div className="card">
          <img className="card-image" src={movieBackdrop} alt=""/>
          <h4 className="card-title">
            {title}
          </h4>
        </div>

      </Link>
    </div>
  )
}

export default Card;