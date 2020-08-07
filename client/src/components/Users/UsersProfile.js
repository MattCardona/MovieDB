import React, { Component } from 'react'
import Axios from 'axios';

class UsersProfile extends Component {
  state = {
    username: "",
    movies: []
  }
  async componentDidMount() {
    try {
      const { data } = await Axios.get("/users");
      console.log("userData", data);
      this.setState(() => ({
        username: data.username,
        movies: [...data.movies]
      }))
    } catch (error) {
      console.log(error.response);
    }
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


export default UsersProfile;