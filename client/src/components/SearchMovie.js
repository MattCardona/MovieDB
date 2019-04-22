import React, { Component } from 'react';

class SearchMovie extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <h1>This will be the Search Movie Component!</h1>
        <p>Searched Movie {this.props.match.params.movie}</p>
      </div>
    )
  }
};


export default SearchMovie;