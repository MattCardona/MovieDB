import React, { Component } from 'react';
import Navbar from './Navbar';

import { connect } from 'react-redux'
import { searchShow, moreTVInfo } from '../actions/moviesActions'

class ShowInfo extends Component {
  seeMoreBtn = React.createRef();
  state = {
    height: "",
    prevLocation: "",
  }
  componentDidMount() {
    this.setState(() => ({
      height: window.innerHeight + 'px',
      prevLocation: this.props.location.state.prev
    }));
    this.props.searchShow(this.props.match.params.id);
    this.seeMoreBtn.current.style.display = "flex"
  }
  handleClick = () => {
    this.props.history.goBack();
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
    this.props.moreTVInfo(id);
  }
  render() {
    const { prevLocation } = this.state;
    const { show } = this.props;
    return (
      <div>
        <div className="container-fluid" style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 14,0.7), rgba(67, 67, 67,0.7)), url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          height: `${this.state.height}`
        }}>
          <Navbar />
          <div className="container" id="overview">
            <h1 id="movie-title" >{show.original_title}</h1>
            <p>{show.overview}</p>
            {this.prevLocation(prevLocation)}
            <div ref={this.seeMoreBtn} className="see-more-box point" onClick={() => this.handleSeeMore(show.id)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ movies }) => ({
  show: movies.movie
});

export default connect(mapStateToProps, { searchShow, moreTVInfo })(ShowInfo);