import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MovieInfo extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    fetch(`/movies/${this.props.match.params.id}`)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  render() {
    return (
      <div>
        <h1>This will be the MovieInfo Component!</h1>
        <p>{this.props.match.params.id}</p>
        <Link to="/" >Go home</Link>
      </div>
    )
  }
};

export default MovieInfo;