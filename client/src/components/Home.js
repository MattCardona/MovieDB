import React, { Component } from 'react';
import Slider from 'react-slick';
import Card from './Card';

class Home extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNowPlaying = this.handleNowPlaying.bind(this);
    this.handlePopular = this.handlePopular.bind(this);
    this.handleTopRated = this.handleTopRated.bind(this);
    this.state = {
      movies: [],
      sliderMovies: []
    }
  }
  componentDidMount(){
    this.handleNowPlaying();
  }
  handleSubmit(e){
    e.preventDefault();
    let value = e.target.elements.movie.value;
    // console.log(value);
    this.props.history.push(`/search/${value}`);
  }
  handleNowPlaying(){
    fetch("/homepage")
    .then((res) => {
      return res.json();
    })
    .then(data => {
      this.setState(() => ({
        sliderMovies: data.slice(0, 6),
        movies: [...data]
      }))
    })
    .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  handlePopular(){
    fetch("/popular")
    .then((res) => {
      return res.json();
    })
    .then(data => {
      this.setState(() => ({
        sliderMovies: data.slice(0, 6),
        movies: [...data]
      }))
    })
    .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  handleTopRated(){
    fetch("/toprated")
    .then((res) => {
      return res.json();
    })
    .then(data => {
      this.setState(() => ({
        sliderMovies: data.slice(0, 6),
        movies: [...data]
      }))
    })
    .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  render() {
    const { sliderMovies } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 5000
    }
    return (
      <div id="home">
        <Slider {...settings} >
          { sliderMovies.map(movie => {
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
          }) }
        </Slider>

        <div className="container-fluid" id="search-container">
          <form onSubmit={this.handleSubmit}>
            <input id="search-input" type="text" placeholder="Search Movie/Tv shows" name="movie"/>
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
                    <p className="nav-link" onClick={this.handleNowPlaying}>Now Playing<span className="sr-only">(current)</span></p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link"  onClick={this.handlePopular}>Popular</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link" onClick={this.handleTopRated}>Top rated</p>
                  </li>
                </ul>
              </div>

            </nav>

            <div className="row">
              {this.state.movies.map(movie => {
                const movieBackdrop = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                return (
                  <Card movie={movie} movieBackdrop={movieBackdrop} prev="home" key={movie.id}/>
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

export default Home;