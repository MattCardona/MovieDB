import React, { Component } from 'react';
import ActorCards from './ActorCards';
import Navbar from '../Navbar';

class Actors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: []
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
  render() {
    const { actors } = this.state;

    return (
      <div className="popular-actors">
        <Navbar />
        <h1>Popular Actors/Actresses</h1>
        <div className="row">
          {actors.map(actor => {
            return <ActorCards {...actor} prev="actors" key={actor.id} />
          })}
        </div>
      </div>
    )
  }
}

export default Actors;