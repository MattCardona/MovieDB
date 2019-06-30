import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar  navbar-expand-lg navbar-dark">
          <Link className="navbar-brand" to="/" style={{ fontFamily: 'Cinzel serif', color: "#ffe000", fontSize: "30px" }}>MovieDB</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-burger" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar-burger">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link hover-effect">Home <i className="fas fa-home"></i></Link>
              </li>
              <li className="nav-item">
                <Link to="/actors" className="nav-link hover-effect" >Actors/Actresses <i className="fas fa-user hover-effect"></i></Link>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    )
  }
}

export default Navbar;