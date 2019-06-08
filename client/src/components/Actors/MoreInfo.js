import React, { Component } from 'react'
import ActorCards from './ActorCards';

class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor: {}
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
          actor: data
        }));
      })
      .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  render() {
    const { actor } = this.state;
    const actorImage = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <img className="card-image" src={actorImage} alt="" />
              <h4 className="card-title">
                {actor.name}
              </h4>
            </div>
          </div>

          <div className="col-md-6">
            <p >
              {actor.biography}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default MoreInfo;