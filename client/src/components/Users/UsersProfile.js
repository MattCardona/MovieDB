import React, { Component } from 'react'
// import Axios from 'axios';
import { getUserInfo, signout, getUsersSavedMovies } from '../../actions/userActions';
import { connect } from 'react-redux'
import Navbar from '../Navbar';
import FavMovies from './FavMovies';
import checkExpToken from '../../utils/checkToken';


class UsersProfile extends Component {
  state = {
    username: "",
    movieIds: [],
    movies: []
  }
  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      checkExpToken(token, this.props.signout);
    }
    const username = await this.props.getUserInfo();
    this.setState(() => ({
      username,
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
          {this.props.usersSavedMovies.length ?
            <div className="user-favMovies container">
              <h2>Favorite / Watch later list</h2>
              <hr />
              <FavMovies movies={this.props.usersSavedMovies} />
            </div>
            :
            null
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ auth }) => ({
  usersSavedMovies: auth.movies
})

export default connect(mapStateToProps, { getUserInfo, signout, getUsersSavedMovies })(UsersProfile);