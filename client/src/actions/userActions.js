import Axios from "axios";
import { SIGNUP_USER, SIGNIN_USER, SIGNOUT_USER, SAVE_MOVIE, GET_USERS_SAVED } from "./types";
import setAuthToken from "../utils/setAuthToken";
import decode from 'jwt-decode'

// if not return user a error
export const signup = (user, cb) => async dispatch => {
  try {
    const { data } = await Axios.post("/signup", user);
    // need to save token to localstorage 
    localStorage.setItem("token", data.token);
    // create method to set auth header with token on axios calls
    setAuthToken(data.token);
    // get user from token and set the usersId to the redux state with JWT-decode
    let { _id } = decode(data.token);
    // console.log(_id);
    dispatch({
      type: SIGNUP_USER,
      token: data.token,
      userId: _id
    });
    cb();
  } catch (error) {
    // console.log(error.response);
    cb(error.response.data);
  }
}

export const signin = (user, cb) => async dispatch => {
  try {
    const { data } = await Axios.post("/signin", user);
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
    let { _id } = decode(data.token);
    const { data: dataTwo } = await Axios.get("/users/movies");
    // console.log(dataTwo, "User movies auth act");
    dispatch({
      type: SIGNIN_USER,
      token: data.token,
      userId: _id,
      movies: dataTwo.movies
    });
    cb();
  } catch (error) {
    // console.log(error.response.data);
    cb(error.response.data);
  }
}

export const signout = () => dispatch => {
  localStorage.removeItem("token");
  setAuthToken(null);
  dispatch({
    type: SIGNOUT_USER
  });
}

export const getUserInfo = () => async dispatch => {
  try {
    const { data } = await Axios.get("/users");
    // console.log("data", data);
    return data;
  } catch (error) {
    // console.log(error);
    // need to do something here if error from backend
    return undefined;
  }
}

export const saveUserLikedMovie = movie => async (dispatch, getState) => {
  try {
    const { data } = await Axios.post("/users/movies", { movie });
    let { movies } = getState().auth;
    let updatedMovies = [...movies, data.savedMovieId];

    dispatch({
      type: SAVE_MOVIE,
      updatedMovies
    })
    return data;

  } catch (error) {
    console.log("error", error.response.data);
  }
}

export const getUsersSavedMovies = () => async dispatch => {
  try {
    const { data } = await Axios.get("/users/movies");
    // console.log(data);
    dispatch({
      type: GET_USERS_SAVED,
      movies: data.movies
    })
  } catch (error) {
    console.log(error);
  }
}