import React, { Component } from 'react'
import Axios from 'axios';

class UsersProfile extends Component {
  async componentDidMount() {
    // if not authorized make them create an accont will make a Private HOC to wrap private routes but for now this will do
    try {
      if (!Axios.defaults.headers.common["Authorization"]) {
        this.props.history.push("/signup")
      } else {
        const { data } = await Axios.get("/users");
        console.log("userData", data);

      }
    } catch (error) {
      console.log(error.response);
    }
  }
  render() {
    return (
      <div>
        This will be the Users Profile Need to make it a AUTH HOC so only if you are signed in and have an account you can view
      </div>
    )
  }
}


export default UsersProfile;