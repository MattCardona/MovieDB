import React, { Component } from 'react';
import Slider from 'react-slick';
import Card from './Card';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { nowPlaying, popular, topRated } from '../actions/moviesActions';
import { signout } from '../actions/userActions';
import checkExpToken from '../utils/checkToken';


class Home extends Component {
  state = {
    search: ""
  }
  now_playing = React.createRef();
  get_popular = React.createRef();
  top_rated = React.createRef();
  componentDidMount() {
    this.handleNowPlaying();
    const token = localStorage.getItem("token");
    if (token) {
      checkExpToken(token, this.props.signout)
    }
  }
  handleChange = (e) => {
    let val = e.target.value;
    this.setState(() => ({
      search: val
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { search } = this.state;
    this.props.history.push(`/search/${search}`);
  }
  handleNowPlaying = () => {
    this.now_playing.current.classList.add("active");
    this.get_popular.current.classList.remove("active");
    this.top_rated.current.classList.remove("active");
    this.props.nowPlaying();
  }
  handlePopular = () => {
    this.now_playing.current.classList.remove("active");
    this.get_popular.current.classList.add("active");
    this.top_rated.current.classList.remove("active");
    this.props.popular();
  }
  handleTopRated = () => {
    this.now_playing.current.classList.remove("active");
    this.get_popular.current.classList.remove("active");
    this.top_rated.current.classList.add("active");
    this.props.topRated();
  }
  render() {
    const { search } = this.state;
    const { sliderMovies, movies } = this.props;
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 5000
    }
    return (
      <div id="home">
        <Slider {...settings} >
          {sliderMovies.map(movie => {
            return (
              <div key={movie.id}>
                <div className="container-fluid"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    height: "100vh"
                  }}
                >
                  <h1>MovieDB.</h1>
                </div>
              </div>
            )
          })}
        </Slider>

        <div className="container-fluid" id="search-container">
          <form onSubmit={this.handleSubmit}>
            <input
              id="search-input"
              type="text"
              placeholder="Search Movie/Tv shows"
              name="movie"
              value={search}
              onChange={this.handleChange}
            />
            <button className="btn btn-primary" id="search-button"
            >Search</button>
          </form>
        </div>

        <div className="container" id="movie-container">

          <nav className="navbar  navbar-expand-lg navbar-dark">
            {/* <a class="navbar-brand" href="#"></a> */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-burger" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbar-burger">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <p ref={this.now_playing} className="nav-link hover-effect" id="now-playing" onClick={this.handleNowPlaying}>Now Playing<span className="sr-only">(current)</span></p>
                </li>
                <li className="nav-item">
                  <p ref={this.get_popular} className="nav-link  hover-effect" id="popular" onClick={this.handlePopular}>Popular</p>
                </li>
                <li className="nav-item">
                  <p ref={this.top_rated} className="nav-link  hover-effect" id="top-rated" onClick={this.handleTopRated}>Top rated</p>
                </li>
                <li className="nav-item">
                  <Link to="/actors" className="nav-link hover-effect" >Actors/Actresses</Link>
                </li>
                {/* auth routes */}
                {!this.props.auth.isAuthenticated ?
                  <React.Fragment>
                    <li className="nav-item">
                      <Link to="/signup" className="nav-link hover-effect" >Signup</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/signin" className="nav-link hover-effect" >Signin</Link>
                    </li>
                  </React.Fragment>
                  :
                  <li className="nav-item">
                    <p onClick={() => this.props.signout()}
                      className="nav-link hover-effect"
                    >Signout</p>
                  </li>
                }


              </ul>
            </div>

          </nav>

          <div className="row">
            {movies.map(movie => {
              const movieBackdrop = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
              return (
                <Card movie={movie} movieBackdrop={movieBackdrop} prev="home" key={movie.id} />
              )
            })}
          </div>
        </div>
        <footer>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-6 box" id="about">
                <p>Small little IMDB like app where you can find and search for movie and tv series. Just type in search bar what you are looking for,
                and let us do the rest. </p>
              </div>
              <div className="col-sm-12 col-md-6 box" >
                <img id="logo" src="https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png" alt="logo" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
};

const mapStateToProps = ({ movies, auth }) => ({
  movies: movies.movies,
  sliderMovies: movies.sliderMovies,
  auth
})

export default connect(mapStateToProps, { nowPlaying, popular, topRated, signout })(Home);