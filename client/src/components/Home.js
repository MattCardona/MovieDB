import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      movies: [],
      sliderMovies: []
    }
  }
  componentDidMount(){
    fetch("/homepage")
    .then((res) => {
      return res.json();
    })
    .then(data => {
      this.setState(() => ({
        //change back to 6 instead of 1 
        sliderMovies: data.slice(0, 1),
        movies: [...data]
      }))
    })
    .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  handleSubmit(e){
    e.preventDefault();
    let value = e.target.elements.movie.value;
    // console.log(value);
    this.props.history.push(`/search/${value}`);
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
            <div className="row">
          {this.state.movies.map(movie => {
            const movieBackdrop = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return (
              <div className="col-xs-12 col-sm-6 col-md-4" key={movie.title} >
                <Link to={`/movie/${movie.id}`}>
                  <div className="card">
                    <img className="card-image" src={movieBackdrop} alt=""/>
                    <h4 className="card-title">
                      {movie.title}
                    </h4>
                  </div>
                </Link>
              </div>
            )
          })}
          </div>
        </div>
        <footer>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-6 box" id="about">
                <p>Small little IMDB like app where you can find and search for movie and tv series. Just type in search what you are looking for,
                and let us do the rest. </p>
              </div>
              <div className="col-sm-12 col-md-6 box" id="logo" >This will be logo</div>
            </div>
          </div>
        </footer>
    </div>
    )
  }
};

export default Home;