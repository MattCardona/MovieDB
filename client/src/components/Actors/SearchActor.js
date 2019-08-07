import React, { Component } from 'react'
import axios from 'axios';
import ActorCards from './ActorCards';
import Navbar from '../Navbar';

class SearchActor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      actors: [],
      search: "",
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
  handleChange(e) {
    let val = e.target.value;
    this.setState(() => ({
      search: val
    }));
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.search);
  }
  render() {
    let { actors, error } = this.state;
    return (
      <div className="search-actor-container">
        <Navbar />
        <div className="container">
          <h1>{this.props.match.params.name.toUpperCase()}</h1>

          {/* need to make into its own component */}
          <div
            className="container popular-actors-form" >
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="actress/actor name"
                value={this.state.search}
                onChange={this.handleChange}
              />
              <button
                className="btn btn-primary"
                id="search-button"
              >Submit</button>
            </form>
          </div>
          {/* ======================= */}

        </div>
        {actors.length < 0 ?
          null
          :
          <div className="container">
            <div className="row">
              {actors.map(actor => {
                return (
                  <ActorCards {...actor} key={actor.id} />
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