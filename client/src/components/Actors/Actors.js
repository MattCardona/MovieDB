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
    console.log(searchTerm);
    this.setState(() => ({
      search: searchTerm
    }))
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.search);
  }
  render() {
    const { actors } = this.state;

    return (
      <div className="popular-actors">
        <Navbar />
        <h1>Popular Actors/Actresses</h1>

        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <button>Submit</button>
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