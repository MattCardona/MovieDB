import React, { Component } from 'react';
import { connect } from 'react-redux'
import { searchedMovie } from '../actions/moviesActions';


class MovieInfo extends Component {
  state = {
    height: "",
    prevLocation: ""
  }
  componentDidMount() {
    this.setState(() => ({
      height: window.innerHeight + 'px',
      prevLocation: this.props.location.state.prev
    }));
    this.props.searchedMovie(this.props.match.params.id);
  }
  handleClick = () => {
    this.props.history.goBack()
  }
  prevLocation = location => {
    switch (location) {
      case "search":
        return <i onClick={this.handleClick} className="fas fa-search hover-effect"> Search</i>;
      case "actor":
        return <i onClick={this.handleClick} className="fas fa-user hover-effect"> Actor/Actress</i>;
      default:
        return <i onClick={this.handleClick} className="fas fa-home hover-effect"> Home</i>;

    }
  }
  render() {
    const { prevLocation } = this.state;
    const { movie } = this.props;
    return (
      <div>
        <div className="container-fluid" style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 14,0.7), rgba(67, 67, 67,0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          height: `${this.state.height}`
        }}>

          <div className="container" id="overview">
            <h1 id="movie-title" >{movie.original_title}</h1>
            <p>{movie.overview}</p>
            {this.prevLocation(prevLocation)}
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  movie: state.movies.movie
})

export default connect(mapStateToProps, { searchedMovie })(MovieInfo);