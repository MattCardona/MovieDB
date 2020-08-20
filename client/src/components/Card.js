import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

const Card = props => {
  let { title, id, name, media_type } = props.movie;
  let { movieBackdrop, prev } = props;
  let path = media_type === "tv" ? `/tv/${id}` : `/movie/${id}`;
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      {props.authenticated ?
        <span
          className="plus-button"
        >
          <i className="fas fa-plus-circle"></i>
        </span>
        :
        null
      }
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
const mapStateToProps = ({ auth }) => ({
  authenticated: auth.isAuthenticated,
})

export default connect(mapStateToProps)(Card);