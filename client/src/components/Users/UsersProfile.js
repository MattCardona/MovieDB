import React, { Component } from 'react'
// import Axios from 'axios';
import { getUserInfo, signout } from '../../actions/userActions';
import { connect } from 'react-redux'
import Navbar from '../Navbar';
import FavMovies from './FavMovies';
import checkExpToken from '../../utils/checkToken';


class UsersProfile extends Component {
  state = {
    username: "",
    movies: []
  }
  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      checkExpToken(token, this.props.signout)
    }
    const { username, movies } = await this.props.getUserInfo();
    this.setState(() => ({
      username,
      movies
    }))
  }
  render() {
    const { username, movies } = this.state;
    return (
      <div id="user-profile">
        <Navbar />
        <div>
          {username ?
            <div className="user-profile-about">
              <h1>{username}s Profile</h1>
            </div>
            :
            null
          }
          {movies.length ?
            <div className="user-favMovies container">
              <h2>Favorite / Watch later list</h2>
              <hr />
              <FavMovies movies={movies} />
            </div>
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default connect(undefined, { getUserInfo, signout })(UsersProfile);