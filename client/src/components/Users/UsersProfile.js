import React, { Component } from 'react'
// import Axios from 'axios';
import { getUserInfo } from '../../actions/userActions';
import { connect } from 'react-redux'

class UsersProfile extends Component {
  state = {
    username: "",
    movies: []
  }
  async componentDidMount() {
    const { username, movies } = await this.props.getUserInfo();
    this.setState(() => ({
      username,
      movies
    }))
  }
  render() {
    const { username, movies } = this.state;
    return (
      <div>
        UsersProfile Component
        {username ?
          <div className="user-profile-about">
            <h1>{username}</h1>
          </div>
          :
          null
        }
        {movies.length ?
          <div className="user-favMovies">
            <h1>Favorite / Watch later list</h1>

          </div>
          :
          null
        }
      </div>
    )
  }
}

export default connect(undefined, { getUserInfo })(UsersProfile);