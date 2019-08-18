import React, { Component } from 'react';
import ActorCards from './ActorCards';
import Navbar from '../Navbar';
import ActorSearchBar from './ActorSearchBar';

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

        <ActorSearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange} search={this.state.search} />

        <div className="container">
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