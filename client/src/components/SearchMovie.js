import React, { Component } from 'react';
import Card from './Card';
// import axios from 'axios';
import MovieSearchBar from './MovieSearchBar';
import Navbar from './Navbar';
import { connect } from 'react-redux'
import { searchMovie, searchedMovieNav } from '../actions/moviesActions';
import { signout, getUsersSavedMovies } from '../actions/userActions';
import checkExpToken from '../utils/checkToken';
import InfiniteScroll from './InfiniteScroll';


class SearchMovie extends Component {
  state = {
    error: "",
    search: "",
    searchTerm: "",
    cbError: false
  }
  componentDidMount() {
    let { movie } = this.props.match.params;
    const token = localStorage.getItem("token");
    if (token) {
      checkExpToken(token, this.props.signout);
      this.props.getUsersSavedMovies();
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
    if (!movie && ownProps.match.params !== this.props.match.params) {
      this.props.searchedMovieNav();
    }
    else if (ownProps.match.params !== this.props.match.params) {
      // this.getNewResults()
      this.setState(() => ({
        searchTerm: movie,
        error: "",
        cbError: false
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
  handleError = () => {
    this.setState(() => ({
      cbError: true
    }));
  }
  render() {
    const { error, search, searchTerm, cbError } = this.state;
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
                if (!movie.poster_path) {
                  return null;
                }
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
        {/* if no found movies or search is nothing dont display Infinitscroll */}
        {movies.length > 0 && !cbError ?
          <InfiniteScroll {...this.props} kind={"searchMovie"} searchMovie={movie} cb={this.handleError} />
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


export default connect(mapStateToProps, { searchMovie, searchedMovieNav, signout, getUsersSavedMovies })(SearchMovie);