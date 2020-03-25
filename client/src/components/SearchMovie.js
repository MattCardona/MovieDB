import React, { Component } from 'react';
import Card from './Card';
// import axios from 'axios';
import MovieSearchBar from './MovieSearchBar';
import Navbar from './Navbar';
import { connect } from 'react-redux'
import { searchMovie, searchedMovieNav } from '../actions/moviesActions';
import { signout } from '../actions/userActions';
import checkExpToken from '../utils/checkToken';


class SearchMovie extends Component {
  state = {
    error: "",
    search: "",
    searchTerm: ""
  }
  componentDidMount() {
    let { movie } = this.props.match.params;
    const token = localStorage.getItem("token");
    if (token) {
      checkExpToken(token, this.props.signout)
    }
    this.setState(() => ({
      searchTerm: movie
    }));

    if (!movie) {
      this.props.searchedMovieNav();
    }

    if (movie) {
      this.props.searchMovie(movie, (error) => {
        this.setState(() => ({
          error
        }))
      });
    }

  }
  componentDidUpdate(ownProps) {
    let { movie } = this.props.match.params;
    if (ownProps.match.params !== this.props.match.params) {
      // this.getNewResults()
      this.setState(() => ({
        searchTerm: movie,
        error: ""
      }));

      this.props.searchMovie(movie, (error) => {
        this.setState(() => ({
          error
        }))
      });
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

    this.props.searchMovie(search, (error) => {
      this.setState(() => ({
        error
      }))
    });

  }
  render() {
    const { error, search, searchTerm } = this.state;
    let { movie } = this.props.match.params;
    const { movies } = this.props;

    return (
      <div id="search-movie-container">
        <Navbar />
        <h1>{movie ? searchTerm.toUpperCase() : null}</h1>

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


export default connect(mapStateToProps, { searchMovie, searchedMovieNav, signout })(SearchMovie);