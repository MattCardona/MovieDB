import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signout } from '../actions/userActions';

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
            {/* auth routes */}
            {!props.auth.isAuthenticated ?
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link hover-effect" >Signup</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link hover-effect" >Signin</Link>
                </li>
              </React.Fragment>
              :
              <li className="nav-item">
                <p onClick={() => props.signout()}
                  className="nav-link hover-effect"
                >Signout</p>
              </li>
            }
          </ul>
        </div>

      </nav>
    </div>
  )
};

const mapStateToProps = ({ auth }) => ({
  auth
})
export default connect(mapStateToProps, { signout })(Navbar);