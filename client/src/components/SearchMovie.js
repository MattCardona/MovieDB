import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';

class SearchMovie extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let { movie } = this.props.match.params;
    let reqbody = { movie };
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // console.log(data);
    axios.post("/movies", querystring.stringify({ movie }), {headers})
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(e => {
      console.log(e);
    })
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