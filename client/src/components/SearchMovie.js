import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchMovie extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <Link to="/" >Go home</Link>
        <h1>This will be the Search Movie Component!</h1>
        <p>Searched Movie {this.props.match.params.movie}</p>
      </div>
    )
  }
};


export default SearchMovie;