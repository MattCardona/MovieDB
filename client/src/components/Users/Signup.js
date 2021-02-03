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
  componentDidMount() {
    if (this.props.isUserSignedIn) {
      this.props.history.goBack();
    }
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
    const e = this.state.error;
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
            {e.error ? <p className="error">{e.error}</p> : null}
            <div className="form-group">
              {e.username ? <p className="error" >{e.username}</p> : null}
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
              {e.password ? <p className="error" >{e.password}</p> : null}
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

const mapStateToProps = ({ auth }) => ({
  isUserSignedIn: auth.isAuthenticated ? true : false
});

export default connect(mapStateToProps, { signup })(Signup);