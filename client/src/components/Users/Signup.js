import React, { Component } from 'react'
import Navbar from '../Navbar';
import { connect } from 'react-redux'
import { signup } from '../../actions/userActions';


class Signup extends Component {
  state = {
    username: "",
    password: ""
  }
  onChange = (e) => {
    let prop = e.target.name;
    let val = e.target.value;

    this.setState(() => ({
      [prop]: val
    }))
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.signup(this.state, () => {
      this.props.history.push("/");
    });
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{ backgroundColor: "black", textAlign: "center", color: "#fff" }}
      >
        <Navbar />
        <h1>Sign up</h1>
        <form onSubmit={this.onSubmit}
          style={{ textAlign: "center" }}
        >
          <div className="form-group">
            <label htmlFor="username"></label>
            <input
              id="username"
              style={{ textAlign: "center", width: "50%" }}
              type="text"
              name="username"
              onChange={this.onChange}
              value={this.state.username}
              placeholder="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              style={{ textAlign: "center", width: "50%" }}
              type="password"
              id="password"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
              placeholder="password"
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(undefined, { signup })(Signup);