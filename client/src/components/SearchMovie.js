import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';

class SearchMovie extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: []
    }
  }
  componentDidMount(){
    let { movie } = this.props.match.params;
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // console.log(data);
    axios.post("/movies", querystring.stringify({ movie }), {headers})
    .then(res => {
      // console.log(res.data);
      this.setState(() => ({
        movies: [...res.data]
      }))
    })
    .catch(e => {
      console.log(e);
    })
  }
  render() {
    return (
      <div style={{
        backgroundColor: "black",
        textAlign: "center",
        paddingBottom: "70px"
      }}>
        <h1
          style={{
            paddingTop: "30px",
            color: "#fff",
            textAlign: "center",
            fontSize: "60px"
          }}
        >{this.props.match.params.movie.toUpperCase()}</h1>
        <Link to="/" >Go home</Link>
      </div>
    )
  }
};


export default SearchMovie;