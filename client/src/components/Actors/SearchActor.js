import React, { Component } from 'react'
import axios from 'axios';

class SearchActor extends Component {
  componentDidMount() {
    console.log(this.props.match.params.name);
  }
  render() {
    return (
      <div>
        This is the Search Actor comp
      </div>
    )
  }
}

export default SearchActor;