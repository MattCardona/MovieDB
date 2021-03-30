import React, { Component } from 'react'
// import Axios from 'axios';
import { getUserInfo, signout, getUsersSavedMovies } from '../../actions/userActions';
import { connect } from 'react-redux'
import Navbar from '../Navbar';
import FavMovies from './FavMovies';
import FavShows from "./FavShows";
import checkExpToken from '../../utils/checkToken';


class UsersProfile extends Component {
  state = {
    username: "",
    movieIds: [],
    movies: [],
    screenWidth: window.innerWidth,
    restOfMovies: false
  }
  async componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    const token = localStorage.getItem("token");
    if (token) {
      checkExpToken(token, this.props.signout);
    }
    const username = await this.props.getUserInfo();
    this.setState(() => ({
      username,
    }))
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState(() => ({
      screenWidth: window.innerWidth
    }))
  }
  toggleMovies = () => {
    this.setState(() => ({ restOfMovies: true }))
  }

  render() {
    const { username, movies, screenWidth, restOfMovies } = this.state;
    return (
      <div id="user-profile">
        <Navbar />
        <div>
          {username ?
            <div className="user-profile-about">
              <h1>{username}s Profile</h1>
            </div>
            :
            null
          }
          {this.props.usersSavedMovies.length ?
            <div className="user-favMovies container">
              <h2>Movie Favorite / Watch later list</h2>
              <hr />
              {
                screenWidth > "767"
                  ?
                  (<React.Fragment>
                    <FavMovies movies={this.props.usersSavedMovies.slice(0, 3)} />
                    {
                      this.props.usersSavedMovies.length > 3 ?
                        restOfMovies ?
                          <FavMovies movies={this.props.usersSavedMovies.slice(3)} />
                          :
                          <h4 className="card-title hover-effect"
                            onClick={this.toggleMovies}
                          >see rest of the {this.props.usersSavedMovies.length - 3} other favorite movies saved... </h4>
                        :
                        null
                    }

                  </React.Fragment>)
                  :
                  (<React.Fragment>
                    <FavMovies movies={this.props.usersSavedMovies.slice(0, 4)} />
                    {restOfMovies ? <FavMovies movies={this.props.usersSavedMovies.slice(4)} /> :
                      <h4 className="card-title hover-effect"
                        onClick={this.toggleMovies}
                      >see rest of the {this.props.usersSavedMovies.length - 4} other favorite movies saved... </h4>
                    }

                  </React.Fragment>)
              }
            </div>
            :
            null
          }
          {this.props.usersSavedShows.length ?
            <div className="user-favMovies container">
              <h2>Show Favorite / Watch later list</h2>
              <hr />
              <FavShows shows={this.props.usersSavedShows} />
            </div>
            :
            null
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ auth }) => ({
  usersSavedMovies: auth.movies,
  usersSavedShows: auth.shows
})

export default connect(mapStateToProps, { getUserInfo, signout, getUsersSavedMovies })(UsersProfile);