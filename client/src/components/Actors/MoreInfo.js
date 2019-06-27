import React, { Component } from 'react'
import Card from '../Card';
import Navbar from '../Navbar';

class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor: {},
      cast: []
    }
  }
  componentDidMount() {
    // console.log(this.props.match.params.id);
    const { id } = this.props.match.params;
    fetch(`/actor/${id}`)
      .then((res) => {
        return res.json();
      })
      .then(data => {
        // console.log(data);
        this.setState(() => ({
          actor: data,
          cast: data.credits.cast
        }));
      })
      .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  render() {
    const { actor, cast } = this.state;
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
            {cast.map(movie => {
              const movieBackdrop = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              return (
                <Card movie={movie} movieBackdrop={movieBackdrop} prev="actor" key={movie.id} />
              );
            })}
          </div>
        </div>
      </div >
    )
  }
}

export default MoreInfo;