import { SIGNUP_USER, SIGNIN_USER, SIGNOUT_USER } from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
import decode from 'jwt-decode';
import Axios from "axios";

let token = localStorage.getItem("token");
let userId = "";
let movies = [];

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
  movies: movies
};

(async (state = initialState) => {
  const { data } = await Axios.get("/users/movies");
  // console.log(data, 'this is the "/users/movies');
  state.movies = await data.movies
})(initialState)


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        isAuthenticated: action.token,
        userId: action.userId
      }
    case SIGNIN_USER:
      return {
        isAuthenticated: action.token,
        userId: action.userId
      }
    case SIGNOUT_USER:
      return {
        isAuthenticated: null,
        userId: ""
      }
    default:
      return state;
  }
}

export default authReducer;