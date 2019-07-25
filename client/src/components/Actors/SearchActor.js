import React, { Component } from 'react'
import axios from 'axios';

class SearchActor extends Component {
  componentDidMount() {
    // console.log(this.props.match.params.name);
    const { name: actor } = this.props.match.params;
    axios.post("/search/person", { actor })
      .then(res => {
        console.log(res.data, "res");
      })
      .catch(e => {
        console.log(e, "error");
      })
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