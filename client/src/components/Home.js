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
        sliderMovies: data.slice(0, 6),
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
      speed: 2500
    }
    return (
      <div>
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

        <div className="container-fluid" style={{textAlign: "center"}}>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="This will be movie/tv show search" style={{
              width: "50%"
            }} name="movie"/>
            <button className="btn btn-primary"
              style={{
                padding: "3px",
                margin: "10px",
                height: "auto"
              }}
            >Search</button>
          </form>
        </div>

      </div>
    )
  }
};

export default Home;