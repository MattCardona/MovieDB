import React, { Component } from 'react';
import MovieInfo from './MovieInfo';
import SearchMovie from './SearchMovie';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>This will be the home Component</h1>
        <MovieInfo />
        <SearchMovie />
      </div>
    )
  }
};

export default Home;