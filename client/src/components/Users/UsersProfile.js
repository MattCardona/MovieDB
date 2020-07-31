import React, { Component } from 'react'
import Axios from 'axios';

class UsersProfile extends Component {
  async componentDidMount() {
    try {
      const { data } = await Axios.get("/users");
      console.log("userData", data);
    } catch (error) {
      console.log(error.response);
    }
  }
  render() {
    return (
      <div>
        UsersProfile Component
      </div>
    )
  }
}


export default UsersProfile;