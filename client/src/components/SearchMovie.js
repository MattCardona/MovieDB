import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import axios from 'axios';
import querystring from 'querystring';
import MovieSearchBar from './MovieSearchBar';
import Navbar from './Navbar';

class SearchMovie extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getNewResults = this.getNewResults.bind(this);
    this.state = {
      movies: [],
      error: "",
      search: "",
      searchTerm: ""
    }
  }
  componentDidMount() {
    let { movie } = this.props.match.params;
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    axios.post("/movies", querystring.stringify({ movie }), { headers })
      .then(res => {
        // console.log(res.data);
        this.setState(() => ({
          movies: [...res.data],
          searchTerm: movie
        }))
      })
      .catch(e => {
        this.setState(() => ({
          error: e.response.data.error
        }))
      })
  }
  handleChange(e) {
    let val = e.target.value;
    this.setState(() => ({
      search: val
    }))
  }
  handleSubmit(e) {
    e.preventDefault();
    this.getNewResults();
    this.setState(() => ({
      search: ""
    }))
  }
  getNewResults() {
    let { search } = this.state;
    this.props.history.push(`/search/${search}`);
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    axios.post("/movies", querystring.stringify({ movie: search }), { headers })
      .then(res => {
        this.setState(() => ({
          movies: [...res.data],
          searchTerm: search
        }))
      })
      .catch(e => {
        this.setState(() => ({
          error: e.response.data.error
        }))
      })
  }
  render() {
    const { movies, error, search, searchTerm } = this.state;

    return (
      <div id="search-movie-container">
        <Navbar />
        <h1>{searchTerm.toUpperCase()}</h1>
        <Link to="/" ><i className="fas fa-home"> Home</i></Link>

        <MovieSearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange} search={search} />

        {movies.length > 0 ?
          <div className="container">
            <div className="row">
              {movies.map(movie => {
                const movieBackdrop = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                return (
                  <Card movie={movie} prev="search" movieBackdrop={movieBackdrop} key={movie.id} />
                )
              })}
            </div>
          </div>
          :
          null
        }
        {error ?
          <div className="container">
            <h1>{error}</h1>
          </div>
          :
          null
        }
      </div>
    )
  }
};


export default SearchMovie;