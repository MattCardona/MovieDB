import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { searchedMovie, moreInfo } from '../actions/moviesActions';
import Trailer from './MovieInfo/Trailer';
import Navbar from './Navbar';
import Recommend from './MovieInfo/Recommend';
import Similar from './MovieInfo/Similar';


class MovieInfo extends Component {
  trailer = React.createRef();
  seeMoreBtn = React.createRef();
  similars = React.createRef();
  recommended = React.createRef();
  state = {
    height: "",
    prevLocation: "",
    trailerIds: [],
    similar: [],
    recommend: [],
    restOfSimilar: false,
    restOfRecommended: false,
  }
  async componentDidMount() {
    if (!this.props.location.state) {
      this.setState(() => ({
        height: window.innerHeight + 'px',
        prevLocation: "/"
      }));
    } else {
      this.setState(() => ({
        height: window.innerHeight + 'px',
        prevLocation: this.props.location.state.prev
      }));
    }
    this.props.searchedMovie(this.props.match.params.id);
  }
  componentDidUpdate(prevProp) {
    if (this.props.match.params.id !== prevProp.match.params.id) {
      this.setState(() => ({
        trailerIds: [],
        similar: [],
        recommend: [],
        prevLocation: this.props.location.state.prev,
        restOfSimilar: false,
        restOfRecommended: false
      }));

      this.props.searchedMovie(this.props.match.params.id);
      this.seeMoreBtn.current.style.display = "flex"
    }
  }
  handleClick = () => {
    this.props.history.goBack()
  }
  prevLocation = location => {
    switch (location) {
      case "search":
        return <i onClick={this.handleClick} className="fas fa-search hover-effect point"> Search</i>;
      case "actor":
        return <i onClick={this.handleClick} className="fas fa-user hover-effect point"> Actor/Actress</i>;
      case "similar":
        return <i onClick={this.handleClick} className="fas fa-long-arrow-alt-left hover-effect point"> Previous</i>;
      case "recommended":
        return <i onClick={this.handleClick} className="fas fa-long-arrow-alt-left hover-effect point"> Previous</i>;
      case "userprofile":
        return <i onClick={this.handleClick} className="far fa-user-circle hover-effect point"> Profile</i>;
      default:
        return <i onClick={this.handleClick} className="fas fa-home hover-effect point"> Home</i>;

    }
  }
  handleSeeMore = async id => {
    const data = await this.props.moreInfo(id);
    // console.log(data);
    const keys = [];
    const sim = [];
    const recommended = [];
    data.videos.results.forEach(element => {
      keys.push(element.key);
    });
    data.similar.results.forEach(simMovie => {
      sim.push(simMovie);
    });
    data.recommendations.results.forEach(recMovie => {
      recommended.push(recMovie);
    })
    this.setState(() => ({
      trailerIds: [...keys],
      similar: [...sim],
      recommend: [...recommended]
    }))
    window.scrollTo(100, this.trailer.current.offsetTop);
    this.seeMoreBtn.current.style.display = "none"
  }
  handleShowMore = type => {
    if (type === "similar") {
      this.setState(() => ({
        restOfSimilar: true
      }))
    } else {
      this.setState(() => ({
        restOfRecommended: true
      }))
    }
  }
  render() {
    const { prevLocation, trailerIds, similar, recommend, restOfSimilar, restOfRecommended } = this.state;
    const { movie } = this.props;
    return (
      <div>
        <div className="container-fluid" style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 14,0.7), rgba(67, 67, 67,0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          height: `${this.state.height}`
        }}>
          < Navbar />
          <div className="container" id="overview">
            <h1 id="movie-title" >{movie.original_title}</h1>
            <p>{movie.overview}</p>
            {this.prevLocation(prevLocation)}
            <div ref={this.seeMoreBtn} className="see-more-box point" onClick={() => this.handleSeeMore(movie.id)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

        </div>
        <div ref={this.trailer}>
          <Trailer trailerIds={trailerIds} title={movie.original_title} />
        </div>
        <div ref={this.similars}>
          {!restOfSimilar ?
            <Similar similar={similar.slice(0, 6)} btn={true} handleShowMore={this.handleShowMore} />
            :
            <Similar similar={similar} />
          }
        </div>
        <div ref={this.recommended}>
          {!restOfRecommended ?
            <Recommend recommend={recommend.slice(0, 6)} btn={true} handleShowMore={this.handleShowMore} />
            :
            <Recommend recommend={recommend} />
          }
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  movie: state.movies.movie
})

export default connect(mapStateToProps, { searchedMovie, moreInfo })(MovieInfo);