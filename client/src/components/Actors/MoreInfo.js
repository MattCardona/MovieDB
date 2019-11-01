import React, { Component } from 'react'
import Card from '../Card';
import Navbar from '../Navbar';
import { connect } from 'react-redux'
import { actorInfo } from '../../actions/actorsActions';


class MoreInfo extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.actorInfo(id);
  }
  render() {
    const { actor, cast } = this.props;

    const actorImage = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
    return (
      <div className="container-fluid" id="actor-more-info">
        <Navbar />
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <img className="card-image" src={actorImage} alt="" />
              <h4 className="card-title">
                {actor.name}
              </h4>
            </div>
          </div>
          <div className="col-md-6" id="actor-bio">
            <p>Birthday: {actor.birthday}</p>
            <p>Birth place: {actor.place_of_birth}</p>
            <p>
              {actor.biography}
            </p>
          </div>
        </div>

        <div className="container" id="featured-movies" >
          <h1>Featured Movies</h1>
          <hr />
          <div className="row">
            {cast ? cast.map(movie => {
              const movieBackdrop = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              return (
                <Card movie={movie} movieBackdrop={movieBackdrop} prev="actor" key={movie.id} />
              );
            }) :
              null
            }
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = ({ actors }) => ({
  actor: actors.actor,
  cast: actors.cast
})

export default connect(mapStateToProps, { actorInfo })(MoreInfo);