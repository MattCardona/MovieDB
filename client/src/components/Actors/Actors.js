import React, { Component } from 'react';
import axios from 'axios';

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
        console.log(data);
        this.setState(() => ({
          actors: data
        }))
      })
      .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  render() {
    return (
      <div>
        <h1>This will be the popular actors/actresses component</h1>
      </div>
    )
  }
}

export default Actors;