import React, { Component } from 'react';
import ActorCards from './ActorCards';
import Navbar from '../Navbar';
import ActorSearchBar from './ActorSearchBar';
import { popularActors } from '../../actions/actorsActions';
import { connect } from 'react-redux'

class Actors extends Component {
  state = {
    search: ""
  };
  componentDidMount() {
    this.props.popularActors();
  }
  handleChange = e => {
    let searchTerm = e.target.value;
    this.setState(() => ({
      search: searchTerm
    }))
  }
  handleSubmit = e => {
    e.preventDefault();
    let { search: name } = this.state;
    this.props.history.push(`/actors/search/${name}`)
  }
  render() {
    const { actors } = this.props;

    return (
      <div className="popular-actors">
        <Navbar />
        <h1>Popular Actors/Actresses</h1>

        <ActorSearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange} search={this.state.search} />

        <div className="container">
          <div className="row">
            {actors.map(actor => {
              return <ActorCards {...actor} prev="actors" key={actor.id} />
            })}
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ actors }) => ({
  actors: actors.actors
})

export default connect(mapStateToProps, { popularActors })(Actors);