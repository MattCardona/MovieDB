import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';

class SearchMovie extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: []
    }
  }
  componentDidMount(){
    let { movie } = this.props.match.params;
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // console.log(data);
    axios.post("/movies", querystring.stringify({ movie }), {headers})
    .then(res => {
      // console.log(res.data);
      this.setState(() => ({
        movies: [...res.data]
      }))
    })
    .catch(e => {
      console.log(e);
    })
  }
  render() {
    const { movies } = this.state;
    
    return (
      <div id="search-movie-container">
        <h1>{this.props.match.params.movie.toUpperCase()}</h1>
        <Link to="/" ><i className="fas fa-home"> Home</i></Link>
        <div className="container">
          <div className="row">
            { movies.map(movie => {
              const movieBackdrop = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              return (
                <div className="col-xs-12 col-sm-6 col-md-4" key={movie.id} >
                  <Link 
                    to={{
                      pathname: `/movie/${movie.id}`,
                      state: { prev: 'search' }
                    }}
                  >
                    <div className="card">
                      <img className="card-image" src={movieBackdrop} alt=""/>
                      <h4 className="card-title">
                        {movie.title}
                      </h4>
                    </div>
                  </Link>
                </div>
              )
            }) }
          </div>
        </div>

      </div>
    )
  }
};


export default SearchMovie;