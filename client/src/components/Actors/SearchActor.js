import React, { Component } from 'react'
import axios from 'axios';

class SearchActor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: []
    };
  }
  componentDidMount() {
    // console.log(this.props.match.params.name);
    const { name: actor } = this.props.match.params;
    axios.post("/search/person", { actor })
      .then(res => {
        console.log(res.data, "res");
        this.setState(() => ({
          actors: res.data
        }))
      })
      .catch(e => {
        console.log(e, "error");
      })
  }
  render() {
    let { actors } = this.state;
    return (
      <div>
        {actors.map(actor => {
          let actorImage = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
          return (
            <div key={actor.id}>
              <h1>{actor.name}</h1>
              <img src={actorImage} alt="" />
            </div>
          )
        })}
      </div>
    )
  }
}

export default SearchActor;