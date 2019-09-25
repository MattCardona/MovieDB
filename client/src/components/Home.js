import React, { Component } from 'react';
import Slider from 'react-slick';
import Card from './Card';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { nowPlaying, popular, topRated } from '../actions/moviesActions';


class Home extends Component {
  state = {
    search: ""
  }
  componentDidMount() {
    this.handleNowPlaying();
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
    document.getElementById("now-playing").classList.add("active");
    document.getElementById("popular").classList.remove("active");
    document.getElementById("top-rated").classList.remove("active");
    this.props.nowPlaying();
  }
  handlePopular = () => {
    document.getElementById("popular").classList.add("active");
    document.getElementById("now-playing").classList.remove("active");
    document.getElementById("top-rated").classList.remove("active");
    this.props.popular();
  }
  handleTopRated = () => {
    document.getElementById("top-rated").classList.add("active");
    document.getElementById("now-playing").classList.remove("active");
    document.getElementById("popular").classList.remove("active");
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
                  <p className="nav-link hover-effect" id="now-playing" onClick={this.handleNowPlaying}>Now Playing<span className="sr-only">(current)</span></p>
                </li>
                <li className="nav-item">
                  <p className="nav-link  hover-effect" id="popular" onClick={this.handlePopular}>Popular</p>
                </li>
                <li className="nav-item">
                  <p className="nav-link  hover-effect" id="top-rated" onClick={this.handleTopRated}>Top rated</p>
                </li>
                <li className="nav-item">
                  <Link to="/actors" className="hover-effect" >Actors/Actresses</Link>
                </li>
              </ul>
            </div>

          </nav>

          <div className="row">
            {movies.map(movie => {
              const movieBackdrop = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
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

const mapStateToProps = ({ movies }) => ({
  movies: movies.movies,
  sliderMovies: movies.sliderMovies
})

export default connect(mapStateToProps, { nowPlaying, popular, topRated })(Home);