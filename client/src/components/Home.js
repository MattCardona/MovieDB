import React, { Component } from 'react';
import Slider from 'react-slick';

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
      // console.log(data);
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
    console.log(value);
    e.target.elements.movie.value = "";
  }
  render() {
    const { sliderMovies } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 3000
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
                </div>
              </div>
            )
          }) }
        </Slider>

        <div className="container-fluid" id="search-container">
          <form onSubmit={this.handleSubmit}>
            <input id="search-input" type="text" placeholder="This will be movie/tv show search" name="movie"/>
            <button className="btn btn-primary" id="search-button"
            >Search</button>
          </form>
        </div>
         
        <div className="container">
            <div className="row">
          {this.state.movies.map(movie => {
            const movieBackdrop = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return (
              <div className="col-xs-12 col-sm-6 col-md-4" key={movie.title} >
                <div className="card">
                  <img className="card-image" src={movieBackdrop} alt=""/>
                  <h4 className="card-title">
                    {movie.title}
                  </h4>
                  {/* need to make to Link */}
                  <a href="#">see more</a>
                </div>
              </div>
            )
          })}
          </div>
        </div>
    </div>
    )
  }
};

export default Home;