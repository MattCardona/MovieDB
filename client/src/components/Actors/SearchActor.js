import React, { Component } from 'react'
import axios from 'axios';
import ActorCards from './ActorCards';
import Navbar from '../Navbar';

class SearchActor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: [],
      error: ""
    };
  }
  componentDidMount() {
    // console.log(this.props.match.params.name);
    const { name: actor } = this.props.match.params;
    axios.post("/search/person", { actor })
      .then(res => {
        // console.log(res.data, "res");
        this.setState(() => ({
          actors: res.data
        }))
      })
      .catch(e => {
        // console.log(e, "error");
        // no person found response
        this.setState(() => ({
          error: e.response.data.error
        }))
      })
  }
  render() {
    let { actors, error } = this.state;
    return (
      <div className="search-actor-container">
        <Navbar />
        <div className="container">
          <h1>{this.props.match.params.name.toUpperCase()}</h1>
          {/* here put in a search bar */}
        </div>
        {actors.length < 0 ?
          null
          :
          <div className="container">
            <div className="row">
              {actors.map(actor => {
                return (
                  <ActorCards {...actor} />
                )
              })}
            </div>
          </div>
        }


        {error ?
          <div className="container">
            <h1>{error}</h1>
          </div>
          : null}
      </div>
    )
  }
}

export default SearchActor;