import React, { Component } from 'react';
import MovieInfo from './MovieInfo';
import SearchMovie from './SearchMovie';

class Home extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    fetch("/homepage")
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then(data =>  console.log(data))
    .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  render() {
    return (
      <div>
        <h1>This will be the home Component</h1>
        
      </div>
    )
  }
};

export default Home;