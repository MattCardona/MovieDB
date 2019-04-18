import React, { Component } from 'react';
import Slider from 'react-slick';

class Home extends Component {
  constructor(props){
    super(props);
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
      </div>
    )
  }
};

export default Home;