import React, { Component } from 'react';
import Navbar from './Navbar';

import { connect } from 'react-redux'
import { searchShow, moreTVInfo } from '../actions/moviesActions'
import Trailer from './MovieInfo/Trailer';
import Similar from './MovieInfo/Similar';
import Recommend from './MovieInfo/Recommend';

class ShowInfo extends Component {
  seeMoreBtn = React.createRef();
  trailer = React.createRef();
  similars = React.createRef();
  recommended = React.createRef();

  state = {
    height: "",
    prevLocation: "",
    trailerIds: [],
    similar: [],
    recommend: [],
    restOfSimilar: false,
  }
  componentDidMount() {
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

    this.props.searchShow(this.props.match.params.id);
  }
  componentDidUpdate(prevProp) {
    if (this.props.match.params.id !== prevProp.match.params.id) {
      this.setState(() => ({
        trailerIds: [],
        similar: [],
        recommend: [],
        restOfSimilar: false,
        prevLocation: this.props.location.state.prev
      }));

      this.props.searchShow(this.props.match.params.id);
      this.seeMoreBtn.current.style.display = "flex"
    }
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
      case "similar":
        return <i onClick={this.handleClick} className="fas fa-long-arrow-alt-left hover-effect point"> Previous</i>;
      case "recommended":
        return <i onClick={this.handleClick} className="fas fa-long-arrow-alt-left hover-effect point"> Previous</i>;
      case "userprofile":
        return <i onClick={this.handleClick} className="far fa-user-circle hover-effect point"> Profile</i>;
      default:
        return <i onClick={this.handleClick} className="fas fa-home hover-effect"> Home</i>;

    }
  }
  handleSeeMore = async id => {
    const data = await this.props.moreTVInfo(id);
    const keys = [];
    const sim = [];
    const recommended = [];
    // console.log(data);
    data.videos.results.forEach(element => {
      keys.push(element.key);
    });
    data.similar.results.forEach(simShow => {
      sim.push(simShow);
    });
    data.recommendations.results.forEach(recShow => {
      recommended.push(recShow);
    })
    this.setState(() => ({
      trailerIds: [...keys],
      similar: [...sim],
      recommend: [...recommended]
    }));

    window.scrollTo(100, this.trailer.current.offsetTop);
    this.seeMoreBtn.current.style.display = "none"
  }
  handleShowMore = type => {
    if (type === "similar") {
      this.setState(() => ({
        restOfSimilar: true
      }))
    }
  }
  render() {
    const { prevLocation, trailerIds, similar, recommend, restOfSimilar } = this.state;
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

        <div ref={this.trailer} >
          <Trailer trailerIds={trailerIds} title={show.original_title} />
        </div>

        <div ref={this.similars}>
          {!restOfSimilar ?
            <Similar similar={similar.slice(0, 6)} btn={true} handleShowMore={this.handleShowMore} isShow={true} />
            :
            <Similar similar={similar} />
          }
        </div>

        <div ref={this.recommended}>
          <Recommend recommend={recommend} media_type={"tv"} />
        </div>

      </div>
    )
  }
};

const mapStateToProps = ({ movies }) => ({
  show: movies.movie
});

export default connect(mapStateToProps, { searchShow, moreTVInfo })(ShowInfo);