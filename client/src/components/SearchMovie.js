import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import MovieSearchBar from './MovieSearchBar';
import Navbar from './Navbar';
import { connect } from 'react-redux'
import { searchMovie } from '../actions/moviesActions';


class SearchMovie extends Component {
  state = {
    error: "",
    search: "",
    searchTerm: ""
  }
  componentDidMount() {
    let { movie } = this.props.match.params;

    this.setState(() => ({
      searchTerm: movie
    }));

    if (movie) {
      this.props.searchMovie(movie);
    }

  }
  handleChange = e => {
    let val = e.target.value;
    this.setState(() => ({
      search: val
    }))
  }
  handleSubmit = e => {
    e.preventDefault();
    this.getNewResults();
    this.setState(() => ({
      search: ""
    }))
  }
  getNewResults = () => {
    let { search } = this.state;
    this.props.history.push(`/search/${search}`);

    this.setState(() => ({
      searchTerm: search,
      error: ""
    }));

    this.props.searchMovie(search);

  }
  render() {
    const { error, search, searchTerm } = this.state;
    let { movie } = this.props.match.params;
    const { movies } = this.props;

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

const mapStateToProps = ({ movies }) => ({
  movies: movies.movies
});


export default connect(mapStateToProps, { searchMovie })(SearchMovie);