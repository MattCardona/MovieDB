import React, { Component } from 'react';
import MovieInfo from './MovieInfo';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>This will be the home Component</h1>
        <MovieInfo />
      </div>
    )
  }
};

export default Home;