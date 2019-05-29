import React, { Component } from 'react';

class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      movie: {},
      height: "",
      prevLocation: ""
    }
  }
  componentDidMount() {
    this.setState(() => ({
      height: window.innerHeight + 'px',
      prevLocation: this.props.location.state.prev
    }));
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
  handleClick() {
    this.props.history.goBack()
  }
  render() {
    const { movie, prevLocation } = this.state;
    return (
      <div>
        <div className="container-fluid" style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 14,0.7), rgba(67, 67, 67,0.7)), url(https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          height: `${this.state.height}`
        }}>

          <div className="container" id="overview">
            <h1 id="movie-title" >{movie.original_title}</h1>
            <p>{movie.overview}</p>
            {prevLocation === "search" ?
              <i onClick={this.handleClick} className="fas fa-search hover-effect"> Search</i>
              : <i onClick={this.handleClick} className="fas fa-home hover-effect"> Home</i>
            }

          </div>
        </div>
      </div>
    )
  }
};

export default MovieInfo;