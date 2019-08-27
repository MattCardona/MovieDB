import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
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
    if (movie) {
      axios.post("/movies", { movie })
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

    axios.post("/movies", { movie: search })
      .then(res => {
        this.setState(() => ({
          movies: [...res.data],
          searchTerm: search,
          error: ""
        }))
      })
      .catch(e => {
        this.setState(() => ({
          error: e.response.data.error,
          searchTerm: search,
          movies: []
        }))
      })
  }
  render() {
    const { movies, error, search, searchTerm } = this.state;
    let { movie } = this.props.match.params;
    return (
      <div id="search-movie-container">
        <Navbar />
        <h1>{searchTerm.toUpperCase()}</h1>

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
        {!movie && !error ?
          <div>
            <h1>Lets find a Movie or TV show</h1>
          </div>
          :
          null
        }
      </div>
    )
  }
};


export default SearchMovie;