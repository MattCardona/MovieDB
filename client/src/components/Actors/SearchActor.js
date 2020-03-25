import React, { Component } from 'react'
// import axios from 'axios';
import { connect } from 'react-redux'

import ActorCards from './ActorCards';
import Navbar from '../Navbar';
import ActorSearchBar from './ActorSearchBar';
import { searchActor } from '../../actions/actorsActions';
import checkExpToken from '../../utils/checkToken';
import { signout } from '../../actions/userActions';



class SearchActor extends Component {
  state = {
    search: "",
    searchedName: "",
    error: ""
  };
  componentDidMount() {
    // console.log(this.props.match.params.name);
    const { name: actor } = this.props.match.params;
    this.setState(() => ({
      searchedName: actor
    }))
    this.props.searchActor(actor);

    const token = localStorage.getItem("token");
    if (token) {
      checkExpToken(token, this.props.signout)
    }
  }
  componentDidUpdate(ownProps) {
    if (this.props.match.params !== ownProps.match.params) {
      const { name: actor } = this.props.match.params;
      this.setState(() => ({
        searchedName: actor
      }))
      this.props.searchActor(actor);
    }
  }
  handleChange = e => {
    let val = e.target.value;
    this.setState(() => ({
      search: val
    }));
  }
  handleSubmit = e => {
    e.preventDefault();
    let { search: actor } = this.state;
    this.props.history.push(actor);
    this.setState(() => ({
      searchedName: actor,
      search: ""
    }))
    this.props.searchActor(actor);
  }
  render() {
    let { error, searchedName } = this.state;
    let { actors } = this.props
    return (
      <div className="search-actor-container">
        <Navbar />
        <div className="container">
          <h1>{searchedName.toUpperCase()}</h1>
          <ActorSearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange} search={this.state.search} />
        </div>
        {actors.length < 0 ?
          null
          :
          <div className="container">
            <div className="row">
              {actors.map(actor => {
                return (
                  <ActorCards {...actor} key={actor.id} />
                )
              })}
            </div>
          </div>
        }


        {error ?
          <div className="container">
            <h1>{error}</h1>
          </div>
          : null}
      </div>
    )
  }
}

const mapStateToProps = ({ actors }) => ({
  actors: actors.actors
})

export default connect(mapStateToProps, { searchActor, signout })(SearchActor);