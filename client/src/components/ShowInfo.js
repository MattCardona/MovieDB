import React, { Component } from 'react';
import Axios from 'axios';

class ShowInfo extends Component {
  state = {
    height: "",
    prevLocation: "",
    show: {}
  }
  async componentDidMount() {
    this.setState(() => ({
      height: window.innerHeight + 'px',
      prevLocation: this.props.location.state.prev
    }));
    const { data } = await Axios.get(`/movies/show/${this.props.match.params.id}`);
    this.setState(() => ({
      show: data
    }))
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
    const { prevLocation, show } = this.state;
    return (
      <div>
        <div className="container-fluid" style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 14,0.7), rgba(67, 67, 67,0.7)), url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          height: `${this.state.height}`
        }}>

          <div className="container" id="overview">
            <h1 id="movie-title" >{show.original_title}</h1>
            <p>{show.overview}</p>
            {this.prevLocation(prevLocation)}
          </div>
        </div>
      </div>
    )
  }
};

export default ShowInfo;