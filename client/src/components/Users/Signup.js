import React, { Component } from 'react'
import Navbar from '../Navbar';
import { connect } from 'react-redux'
import { signup } from '../../actions/userActions';


class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  }
  onChange = (e) => {
    let prop = e.target.name;
    let val = e.target.value;

    this.setState(() => ({
      [prop]: val,
      error: ""
    }))
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.signup(this.state, (e) => {
      if (e) {
        this.setState(() => ({
          error: e
        }))
      } else {
        this.props.history.push("/");
      }
    });
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{ backgroundColor: "black", textAlign: "center", color: "#fff" }}
      >
        <Navbar />
        <div style={{ paddingTop: "100px" }}>
          <h1>Sign up</h1>
          <form onSubmit={this.onSubmit}
            style={{ textAlign: "center" }}
          >
            {this.state.error.error ? <p className="error">{this.state.error.error}</p> : null}
            <div className="form-group">
              {this.state.error.username ? <p className="error" >{this.state.error.username}</p> : null}
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
              {this.state.error.password ? <p className="error" >{this.state.error.password}</p> : null}
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
      </div>
    )
  }
}

export default connect(undefined, { signup })(Signup);