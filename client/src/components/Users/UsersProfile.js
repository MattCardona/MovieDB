import React, { Component } from 'react'
import Axios from 'axios';

class UsersProfile extends Component {
  state = {
    movies: []
  }
  async componentDidMount() {
    try {
      const { data } = await Axios.get("/users");
      console.log("userData", data);
      this.setState(() => ({
        movies: [...data.movies]
      }))
    } catch (error) {
      console.log(error.response);
    }
  }
  render() {
    return (
      <div>
        UsersProfile Component

        {this.state.movies.length ?
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