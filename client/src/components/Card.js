import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { saveUserLikedMovie } from '../actions/userActions';


const Card = props => {
  const addRef = React.createRef();
  let { title, id, name, media_type, movieId } = props.movie;
  id = id || movieId;
  let { movieBackdrop, prev, savedMovies } = props;
  let path = media_type === "tv" ? `/tv/${id}` : `/movie/${id}`;
  const saveMovie = async () => {
    let movie = {
      title,
      movieId: id,
      posterPath: path,
      backdropPath: movieBackdrop
    }
    const data = await props.saveUserLikedMovie(movie);
    // console.log(data);
    // do something if success or error
    addRef.current.style.display = "none"
  }
  return (
    <div className="col-6 col-sm-6 col-md-4">
      {props.authenticated && !savedMovies.includes(id.toString()) ?
        <span
          ref={addRef}
          onClick={saveMovie}
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
  savedMovies: auth.movies
})

export default connect(mapStateToProps, { saveUserLikedMovie })(Card);