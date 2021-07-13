import React, { Component } from 'react'
// import Axios from 'axios';
import { getUserInfo, signout, getUsersSavedMovies, filterByDateAscending, filterByRating } from '../../actions/userActions';
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
    restOfMovies: false,
    restOfShows: false
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
  toggleRest = type => {
    if (type === "movie") {
      this.setState(() => ({ restOfMovies: true }))
    } else {
      this.setState(() => ({ restOfShows: true }))
    }
  }
  filterByDateAscending = async type => {
    if (type === "movie") {
      let filteredMovies = await this.props.usersSavedMovies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      await this.props.filterByDateAscending(filteredMovies, undefined);
    } else {
      let filteredShows = await this.props.usersSavedShows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      await this.props.filterByDateAscending(undefined, filteredShows);
    }

  }
  filterByRating = async type => {
    if (type === "movie") {
      let filteredMovies = this.props.usersSavedMovies.sort((a, b) => b.voteAverage - a.voteAverage);
      this.props.filterByRating(filteredMovies, undefined);
    } else {
      let filteredShows = this.props.usersSavedShows.sort((a, b) => b.voteAverage - a.voteAverage);
      this.props.filterByRating(undefined, filteredShows);
    }
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
              <h2>Movie Favorites / Watch later list</h2>
              <hr />

              <li className="nav-item sort">
                <p className="nav-link "
                  style={{ color: "white" }}
                >Sort</p>
                <ul className="dropdown">
                  <li className="nav-item">
                    <p className="nav-link hover-effect" onClick={() => this.filterByDateAscending("movie")}
                    >Newly added</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link hover-effect" onClick={() => this.filterByRating("movie")}
                    >Rating</p>
                  </li>
                </ul>
              </li>

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
                          <h4 className="card-title hover-effect favmovie"
                            onClick={() => this.toggleRest("movie")}
                          >see rest of the {this.props.usersSavedMovies.length - 3} other favorite movies saved... </h4>
                        :
                        null
                    }

                  </React.Fragment>)
                  :
                  (<React.Fragment>
                    <FavMovies movies={this.props.usersSavedMovies.slice(0, 4)} />
                    {restOfMovies ? <FavMovies movies={this.props.usersSavedMovies.slice(4)} /> :
                      <h4 className="card-title hover-effect favmovie"
                        onClick={() => this.toggleRest("movie")}
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
              <h2>Show Favorites / Watch later list</h2>
              <hr />

              <li className="nav-item sort">
                <p className="nav-link "
                  style={{ color: "white" }}
                >Sort</p>
                <ul className="dropdown">
                  <li className="nav-item">
                    <p className="nav-link hover-effect" onClick={() => this.filterByDateAscending("show")}
                    >Newly added</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link hover-effect" onClick={() => this.filterByRating("show")}
                    >Rating</p>
                  </li>
                </ul>
              </li>

              {screenWidth > "767"
                ?
                (<React.Fragment>
                  <FavShows shows={this.props.usersSavedShows.slice(0, 3)} />
                  {this.props.usersSavedShows.length > 3 ?

                    this.state.restOfShows
                      ?
                      <FavShows shows={this.props.usersSavedShows.slice(3)} />
                      :
                      <h4 className="card-title hover-effect favmovie"
                        onClick={() => this.toggleRest("show")}
                      >see rest of the {this.props.usersSavedShows.length - 3} other favorite shows saved... </h4>

                    :
                    null
                  }

                </React.Fragment>)
                :
                (<React.Fragment>
                  <FavShows shows={this.props.usersSavedShows.slice(0, 4)} />
                  {this.props.usersSavedShows.length > 4 ?

                    this.state.restOfShows
                      ?
                      <FavShows shows={this.props.usersSavedShows.slice(4)} />
                      :
                      <h4 className="card-title hover-effect favmovie"
                        onClick={() => this.toggleRest("show")}
                      >see rest of the {this.props.usersSavedShows.length - 4} other favorite shows saved... </h4>

                    :
                    null
                  }

                </React.Fragment>)
              }

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

export default connect(mapStateToProps, { getUserInfo, signout, getUsersSavedMovies, filterByDateAscending, filterByRating })(UsersProfile);