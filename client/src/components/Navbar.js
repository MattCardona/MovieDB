import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar  navbar-expand-lg navbar-dark">
          {/* <a class="navbar-brand" href="#"></a> */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-burger" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar-burger">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link hover-effect">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/actors" className="nav-link hover-effect" >Actors/Actresses</Link>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    )
  }
}

export default Navbar;