import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MovieInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      movie: {}
    }
  }
  componentWillMount(){
    fetch(`/movies/${this.props.match.params.id}`)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      // console.log(data);
      this.setState(() => ({
        movie: data
      }));
    })
    .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  render() {
    const { movie } = this.state;
    return (
        <div className="container-fluid" style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 14,0.9), rgba(67, 67, 67,0.9)), url(https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          height: "100vh"
        }}>
          <h1 id="movie-title" >{movie.original_title}</h1>
          <div className="container" id="overview">
            <p>{movie.overview}</p>
            <Link to="/" >Home</Link>
          </div>
        </div>
    )
  }
};

export default MovieInfo;