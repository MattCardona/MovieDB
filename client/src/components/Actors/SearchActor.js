import React, { Component } from 'react'
import axios from 'axios';
import ActorCards from './ActorCards';
import Navbar from '../Navbar';
import ActorSearchBar from './ActorSearchBar';

class SearchActor extends Component {
  state = {
    actors: [],
    search: "",
    searchedName: "",
    error: ""
  };
  componentDidMount() {
    // console.log(this.props.match.params.name);
    const { name: actor } = this.props.match.params;
    this.getActor(actor);
  }
  getActor = (actor) => {
    axios.post("/search/person", { actor })
      .then(res => {
        // console.log(res.data, "res");
        this.props.history.push(actor)
        this.setState(() => ({
          actors: res.data,
          search: "",
          searchedName: actor
        }))
      })
      .catch(e => {
        // console.log(e, "error");
        this.setState(() => ({
          error: e.response.data.error,
          search: "",
          searchedName: actor,
          actors: []
        }))
      })
  }
  handleChange = (e) => {
    let val = e.target.value;
    this.setState(() => ({
      search: val
    }));
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.search);
    let { search: actor } = this.state;
    this.getActor(actor);
  }
  render() {
    let { actors, error, searchedName } = this.state;
    return (
      <div className="search-actor-container">
        <Navbar />
        <div className="container">
          <h1>{searchedName.toUpperCase()}</h1>
          <ActorSearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange} search={this.state.search} />
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