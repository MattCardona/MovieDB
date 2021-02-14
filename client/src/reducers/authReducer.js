import { SIGNUP_USER, SIGNIN_USER, SIGNOUT_USER, SAVE_MOVIE, GET_USERS, DELETE_SAVED_MOVIE } from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
import decode from 'jwt-decode';
import Axios from "axios";

let token = localStorage.getItem("token");
let userId = "";
let movies = [];
let movieIds = [];
let shows = [];
let showIds = [];

const checkTokenExp = token => {
  const user = decode(token);
  const currentTime = Date.now() / 1000;

  if (user.exp < currentTime) {
    // console.log("token exp");
    token = null;
    localStorage.removeItem("token");
    window.location.href = '/signin';
    return false;
  } else {
    return true;
  }
}


if (token) {
  if (checkTokenExp(token)) {
    setAuthToken(token);
    userId = decode(token)._id;
  }
}

const initialState = {
  isAuthenticated: token,
  userId,
  movies: movies,
  movieIds: movieIds,
  shows: shows,
  showIds: showIds
};

(async (state = initialState) => {
  try {
    const { data } = await Axios.get("/users/movies");
    // console.log(data, 'this is the "/users/movies');
    state.movies = await data.movies;
    state.movieIds = await data.movieIds;
    state.shows = await data.shows;
    state.showIds = await data.showIds;
  } catch (error) {
    return;
  }
})(initialState)


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        ...state,
        isAuthenticated: action.token,
        userId: action.userId,
        movies: [],
        movieIds: []
      }
    case SIGNIN_USER:
      return {
        ...state,
        isAuthenticated: action.token,
        userId: action.userId,
        movies: [...action.movies],
        movieIds: [...action.movieIds]
      }
    case SIGNOUT_USER:
      return {
        isAuthenticated: null,
        userId: ""
      }
    case SAVE_MOVIE:
      return {
        ...state,
        movieIds: [...action.updatedMovies],
        movies: [...action.movies]
      }
    case DELETE_SAVED_MOVIE:
      return {
        ...state,
        movies: [...action.movies],
        movieIds: [...action.updatedMovies],
      }
    case GET_USERS:
      return {
        ...state,
        movies: [...action.movies],
        movieIds: [...action.movieIds],
        userId: action.userId,

      }
    default:
      return state;
  }
}

export default authReducer;