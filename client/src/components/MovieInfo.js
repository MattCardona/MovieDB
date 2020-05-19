import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { searchedMovie, moreInfo } from '../actions/moviesActions';
import Trailer from './Trailer';
import Axios from 'axios';


class MovieInfo extends Component {
  trailer = React.createRef()
  state = {
    height: "",
    prevLocation: "",
    trailerIds: []
  }
  async componentDidMount() {
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
  handleSeeMore = async id => {
    const data = await this.props.moreInfo(id);
    const keys = [];
    data.videos.results.forEach(element => {
      keys.push(element.key);
    });
    this.setState(() => ({
      trailerIds: [...keys]
    }))
    window.scrollTo(100, this.trailer.current.offsetTop)
  }
  render() {
    const { prevLocation, trailerIds } = this.state;
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
            <div class="see-more-box" onClick={() => this.handleSeeMore(movie.id)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

        </div>
        <div ref={this.trailer}>
          <Trailer trailerIds={trailerIds} />
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  movie: state.movies.movie
})

export default connect(mapStateToProps, { searchedMovie, moreInfo })(MovieInfo);