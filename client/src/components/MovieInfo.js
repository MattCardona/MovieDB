import React, { Component } from 'react';

class MovieInfo extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <h1>This will be the MovieInfo Component!</h1>
        <p>{this.props.match.params.id}</p>
      </div>
    )
  }
};

export default MovieInfo;