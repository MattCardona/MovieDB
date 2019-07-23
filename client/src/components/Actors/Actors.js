import React, { Component } from 'react';
import ActorCards from './ActorCards';
import Navbar from '../Navbar';

class Actors extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      actors: [],
      search: ""
    };
  }
  componentDidMount() {
    fetch("/popularactors")
      .then((res) => {
        return res.json();
      })
      .then(data => {
        // console.log(data);
        this.setState(() => ({
          actors: data
        }))
      })
      .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  handleChange(e) {
    let searchTerm = e.target.value;
    this.setState(() => ({
      search: searchTerm
    }))
  }
  handleSubmit(e) {
    e.preventDefault();
    let { search: name } = this.state;
    this.props.history.push(`/actors/search/${name}`)
  }
  render() {
    const { actors } = this.state;

    return (
      <div className="popular-actors">
        <Navbar />
        <h1>Popular Actors/Actresses</h1>

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

        <div className="container-fluid">
          <div className="row">
            {actors.map(actor => {
              return <ActorCards {...actor} prev="actors" key={actor.id} />
            })}
          </div>
        </div>

      </div>
    )
  }
}

export default Actors;