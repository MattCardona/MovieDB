import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { saveUserLikedMovie } from '../actions/userActions';


const Card = props => {
  const addRef = React.createRef();
  const [success, setSuccess] = useState("");
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
    try {
      const data = await props.saveUserLikedMovie(movie);
      // do something if success or error
      if (data) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 4000);
        addRef.current.style.display = "none"
      }

    } catch (error) {
      // console.log(error);
      return undefined;
    }
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
      <React.Fragment>
        {success ? <h1
          className="success-saved"
        >Saved</h1> : null}
      </React.Fragment>
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