import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <div>
      <nav className="navbar  navbar-expand-lg navbar-dark my-navbar">
        <Link className="navbar-brand" to="/" >MovieDB</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-burger" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar-burger">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link hover-effect">Home <i className="fas fa-home"></i></Link>
            </li>
            <li className="nav-item">
              <Link to="/actors" className="nav-link hover-effect" >Actors/Actresses <i className="fas fa-user"></i></Link>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-link hover-effect" >Movie Search <i className="fas fa-film"></i></Link>
            </li>
          </ul>
        </div>

      </nav>
    </div>
  )
};
export default Navbar;