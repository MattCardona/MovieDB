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
      <div>
        <div className="container-fluid">
          <h1 id="movie-title" >{movie.original_title}</h1>
          <div className="container" id="overview">
            <p>{movie.overview}</p>
            <Link to="/" >Home</Link>
          </div>
        </div>
      </div>
    )
  }
};

export default MovieInfo;