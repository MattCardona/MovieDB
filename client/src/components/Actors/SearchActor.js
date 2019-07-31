import React, { Component } from 'react'
import axios from 'axios';
import ActorCards from './ActorCards';
import Navbar from '../Navbar';

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
      <div style={{ backgroundColor: "black" }}>
        <div className="container"
          style={{ textAlign: "center", color: "#fff" }}
        >
          <Navbar />
          <h1>Searched Actor/Actress {this.props.match.params.name.toUpperCase()}</h1>
          {/* here put in a search bar */}
        </div>
        <div className="row">
          {actors.map(actor => {
            return (
              <ActorCards {...actor} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default SearchActor;